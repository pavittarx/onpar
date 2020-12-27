import axios from "axios";
import React, { useEffect, useState, useContext } from "react";

import dotenv from "dotenv";
dotenv.config();

import Button from "@material-ui/core/Button";

export default () => {
  const [files, setFiles] = useState();

  const upload = () => {
    if (!files) {
      alert("No files selected. Please select a file.");
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }

    const endpoint = process.env.REACT_APP_DOMAIN + "/api/admin/employees";

    axios
      .post(endpoint, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        alert("Files Uploaded successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <input
        type="file"
        multiple={true}
        onChange={(e) => setFiles(e.target.files)}
      />
      <br />
      <Button variant="contained" color="primary" onClick={upload}>
        Upload
      </Button>
    </>
  );
};
