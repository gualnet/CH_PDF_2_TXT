import React, { useRef } from 'react';
import { Button, Container } from '@mui/material';
import PropTypes from 'prop-types';

import './UploadForm.scss';
import CONFIG from '../../lib/CONFIG';

/**
 * 
 * @param {UploadFormProps} props 
 * @returns 
 */
const UploadForm = (props) => {
  const inputRef = useRef();

  /**
   * sends the file to the server
   * @param {*} fileData 
   */
  const sendUploadedFile = async (fileData) => {

    try {
      // create a form data object to send the file
      const formData = new FormData();
      formData.append('file', fileData);

      const fetchResult = await fetch(
        `${CONFIG.apiBaseURL}/pdf`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (fetchResult.ok) {
        const jsonResult = await fetchResult.json();
        props.setUploadResult(jsonResult);
      } else {
        alert('Oops an unknow error occured, please retry !');
        props.setUploadResult();
      }

    } catch (error) {
      console.error('[ERROR]', error);
    }

  }

  const inputOnChangeHandler = (ev) => {
    const filesObj = ev.target.files;
    if (filesObj.length < 1) {
      inputRef.current.value = '';
      return;
    }

    const uploadedFile = filesObj[0];
    if (uploadedFile.type !== 'application/pdf') {
      inputRef.current.value = '';
      alert('This file type is not allowed !');
      return;
    }

    sendUploadedFile(uploadedFile);
  };

  return (
    <Container id='form-container'>
      <h2 id='form-title'>PDF 2 TEXT</h2>
      <label id='form-btn-container'>
        <input
          ref={inputRef}
          type='file'
          name='upload'
          accept='application/pdf'
          onChange={inputOnChangeHandler}
        />
        <Button
          id='upload-btn'
          variant='contained'
          color='primary'
          component='span'
        >
          Upload
        </Button>
      </label>
    </Container>
  );
};

UploadForm.propTypes = {
  setUploadResult: PropTypes.func,
};

/**
 * @typedef {object} UploadFormProps
 * @property {Function} setUploadResult
 */

export default UploadForm;