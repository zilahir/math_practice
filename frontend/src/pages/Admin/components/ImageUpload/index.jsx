import { useCallback, useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

import styles from "./ImageUpload.module.scss";
import { apiEndpoints, API_ROOT_URL } from "../../../../api";
import useApi from "../../../../hooks/useAPI";
import { baseStyle, focusedStyle, acceptStyle, rejectStyle } from "./styles";

function filePathUrl(path) {
  if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "development"
  ) {
    return path;
  }

  return `${API_ROOT_URL}${apiEndpoints.static}/${path}`;
}

function ImageUpload({ setTaskImagePath, deletePreview, isPreviewImageUrl }) {
  const [previewImageUrl, setPreviewImageUrl] = useState(isPreviewImageUrl);
  const { apiRequestHandler } = useApi({
    pathName: apiEndpoints.uploadImage,
    method: "POST",
    requestOptions: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });

  const onDrop = useCallback(
    (acceptedFiles) => {
      const fd = new FormData();
      fd.append("file", acceptedFiles[0]);
      apiRequestHandler(fd).then((response) => {
        setPreviewImageUrl(response.imagePath);
        setTaskImagePath(response.insertId);
      });
    },
    [apiRequestHandler, setTaskImagePath],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  useEffect(() => {
    if (deletePreview) {
      setPreviewImageUrl(undefined);
    }
  }, [deletePreview]);

  const customStyle = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );

  return (
    <div className={styles.dropdownRootContainer}>
      <div className={styles.innerContainer}>
        <div {...getRootProps({ style: customStyle })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Dobd ide a fájlt</p>
          ) : (
            <p>Húzd ide a feltöltendő képet</p>
          )}
        </div>
        {previewImageUrl && (
          <img
            className={styles.previewImage}
            alt="preview"
            src={filePathUrl(previewImageUrl)}
          />
        )}
      </div>
      {previewImageUrl && <p className={styles.filePath}>{previewImageUrl}</p>}
    </div>
  );
}

ImageUpload.defaultProps = {
  isPreviewImageUrl: false,
};

ImageUpload.propTypes = {
  deletePreview: PropTypes.bool.isRequired,
  setTaskImagePath: PropTypes.func.isRequired,
  isPreviewImageUrl: PropTypes.bool,
};

export default ImageUpload;
