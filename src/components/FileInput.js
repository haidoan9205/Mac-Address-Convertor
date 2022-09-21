import React, { useEffect, useState } from "react";
import fileDownload from "js-file-download";
import { Grid } from "@mui/material";

const FileInput = () => {

  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [formattedArr, setFormattedArr] = useState([]);
  const [newArr, setNewArr] = useState([]);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
    const reader = new FileReader();
    var tmpArr = [];
    var tmpString;
    reader.onload = (e) => {
      const text = e.target.result;
      tmpString = text;
      tmpArr.push(tmpString.split("\r\n"));
      var inCompleteArr = tmpArr[0];
      for (let i = 0; i < inCompleteArr.length - 1; i++) {
        if (
          !inCompleteArr[i]
            .toString()
            .match(
              "^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$”"
            )
        ) {
          newArr.push(
            inCompleteArr[i].slice(0, 2) +
              ":" +
              inCompleteArr[i].slice(2, 4) +
              ":" +
              inCompleteArr[i].slice(4, 6) +
              ":" +
              inCompleteArr[i].slice(6, 8) +
              ":" +
              inCompleteArr[i].slice(8, 10) +
              ":" +
              inCompleteArr[i].slice(10, inCompleteArr.length - 1)
          );
        } else {
          newArr.push(inCompleteArr[i]);
        }
      }
      setFormattedArr(...formattedArr, newArr)

    };
    reader.readAsText(event.target.files[0]);
  };


  return (
    <div>
      <input type="file" name="file" onChange={changeHandler} />
      {isSelected ? (
        <Grid
          style={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "50%",
          }}
        >
          <Grid item xs={5}>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate:{" "}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
            <button
              onClick={() => {
                fileDownload(formattedArr.join("\r\n"), "data-converted.txt");
              }}
            >
              Download File
            </button>
          </Grid>
          <Grid item xs={5} >
            {formattedArr.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </Grid>
        </Grid>
      ) : (
        <p>Select a file to show details</p>
      )}
    </div>
  );
};

export default FileInput;
