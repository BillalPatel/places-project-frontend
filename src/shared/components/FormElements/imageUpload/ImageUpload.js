import React, { useState, useRef, useEffect } from 'react';

import Button from '../button/Button';
import './ImageUpload.css';

const ImageUpload = (props) => {
  const { id, center, onInput, errorText } = props;

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState();

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const selectedImage = (event) => {
    let selectedFile;
    let fileIsValid = isValid;

    if (event.target.files && event.target.files.length === 1) {
      selectedFile = event.target.files[0];
      setFile(selectedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    onInput(id, selectedFile, fileIsValid);
  };

  const selectImage = () => {
    filePickerRef.current.click();
  };

  return (
    <>
      <div className="form-control">
        <input
          id={id}
          type="file"
          accept=".jpg,.png,.jpeg"
          ref={filePickerRef}
          style={{ display: 'none' }}
          onChange={selectedImage}
        />
      </div>
      <div className={`image-upload ${center && 'center'}`}>
        <div className="image-upload__preview">
          {previewUrl && (<img src={previewUrl} alt="Preview" />) }
          {!previewUrl && (
            <p>Please select an image</p>
          )}
        </div>
        <Button type="button" onClick={selectImage}>Select Image</Button>
      </div>
      {!isValid && (
        <p>{errorText}</p>
      )}
    </>
  );
};

export default ImageUpload;
