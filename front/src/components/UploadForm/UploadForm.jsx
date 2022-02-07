import { Button, Container } from '@mui/material';
import React from 'react';

import './UploadForm.scss';

const UploadForm = () => {

  const inputOnChangeHandler = (ev) => {
    console.log('inputOnChangeHandler', ev);
  };

  return (
    <Container id='form-container'>
      <h2 id='form-title'>MY UPLOAD FORM</h2>
      <label id='form-btn-container'>
        <input
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

export default UploadForm;