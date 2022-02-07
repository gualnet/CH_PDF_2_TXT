import React, { useEffect, useState, useCallback } from 'react';
import { Container, Paper } from '@mui/material';
import PropTypes from 'prop-types';

import './TextDisplay.scss';
import CONFIG from '../../lib/CONFIG';


/**
 * 
 * @param {TextDisplayProps} props 
 * @returns 
 */
const TextDisplay = (props) => {
  console.log('PROPS', props)
  const [textToDisplay, setTextToDisplay] = useState('NONE');

  const formatTextToDisplay = (textArray) => {
    const merged = [];
    textArray?.map((pageText, pidx) => {
      console.log('<>', pageText);
      const lines = pageText.split('\n');
      lines.map((line, lidx) => merged.push(
        <div key={`${pidx}-${lidx}`}>
          {line}
          <br></br>
        </div >));
    });
    setTextToDisplay(merged);
  };

  const fetchTextFromUploadedFile = useCallback(async (filename) => {
    console.log('fetchTextFromUploadedFile')
    try {
      const fetchRes = await fetch(`${CONFIG.apiBaseURL}/pdf/text/${filename}`);
      console.log('fetchRes', fetchRes);
      if (fetchRes.ok) {
        const jsonRes = await fetchRes.json();
        console.log('jsonRes', jsonRes);
        formatTextToDisplay(jsonRes.textArray);
      } else {
        setTextToDisplay();
        alert('Sorry an error occurred');
      }
    } catch (error) {
      console.error('[ERROR]', error);
    }
  }, []);

  useEffect(() => {
    console.log('useEffect.....')
    if (!props.uploadResult) return;
    fetchTextFromUploadedFile(props.uploadResult.filename);
  }, [props.uploadResult]);

  return (
    <Container id='display-container'>
      <Paper
        className='card'
        id='text-container'
        elevation={4}
      >
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