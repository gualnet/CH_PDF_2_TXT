import React, { useEffect, useState, useCallback } from 'react';
import { Container, Paper, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

import './TextDisplay.scss';
import CONFIG from '../../lib/CONFIG';


/**
 * 
 * @param {TextDisplayProps} props 
 * @returns 
 */
const TextDisplay = (props) => {
  const [textToDisplay, setTextToDisplay] = useState('.');
  const [isLoading, setIsLoading] = useState(false);

  const formatTextToDisplay = (textArray) => {
    const formatedTextArr = [];
    textArray?.map((pageText, pidx) => {
      const lines = pageText.split('\n');
      lines.map((line, lidx) => formatedTextArr.push(
        <div key={`${pidx}-${lidx}`}>
          {line}
          <br></br>
        </div >
      ));
    });
    setTextToDisplay(formatedTextArr);
    setIsLoading(false);
  };

  const fetchTextFromUploadedFile = useCallback(async (filename) => {
    try {
      const fetchRes = await fetch(`${CONFIG.apiBaseURL}/pdf/text/${filename}`);
      if (fetchRes.ok) {
        const jsonRes = await fetchRes.json();
        formatTextToDisplay(jsonRes.textArray);
      } else {
        setTextToDisplay();
        setIsLoading(false);
        alert('Sorry an error occurred');
      }
    } catch (error) {
      console.error('[ERROR]', error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!props.uploadResult) return;
    setIsLoading(true);
    setTextToDisplay();
    fetchTextFromUploadedFile(props.uploadResult.filename);
  }, [props.uploadResult]);

  return (
    <Container id='display-container'>
      <Paper
        className='card'
        id='text-container'
        elevation={4}
      >
        {isLoading &&
          <CircularProgress id='progress-bar' />
        }
        {textToDisplay}
      </Paper>
    </Container>
  );
};

TextDisplay.propTypes = {
  uploadResult: PropTypes.object,
};

/**
 * @typedef {object} TextDisplayProps
 * @property {object} uploadResult
 * @property {string} uploadResult.filename
 * @property {string} uploadResult.originalname
 */

export default TextDisplay;