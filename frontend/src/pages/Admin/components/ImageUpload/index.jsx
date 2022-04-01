import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { apiEndpoints } from "../../../../api";

import useApi from "../../../../hooks/useAPI";

function ImageUpload() {
  const [fileToUpload, setFileToUpload] = useState();
  const { loading, apiResponse, apiRequestHandler } = useApi({
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
      apiRequestHandler(fd);
    },
    [apiRequestHandler],
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

export default ImageUpload;
