import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

import { apiEndpoints } from "../../../../api";
import useApi from "../../../../hooks/useAPI";

function ImageUpload({ setTaskImagePath }) {
  const { loading, apiRequestHandler } = useApi({
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
        setTaskImagePath(response.filePath);
      });
    },
    [apiRequestHandler, setTaskImagePath],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
    </div>
  );
}

ImageUpload.propTypes = {
  setTaskImagePath: PropTypes.func.isRequired,
};

export default ImageUpload;
