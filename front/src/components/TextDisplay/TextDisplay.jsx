import { Container, Paper } from '@mui/material';
import React, { useState } from 'react';

import './TextDisplay.scss';

const TextDisplay = () => {

  const [textToDisplay, setTextToDisplay] = useState('NONE');

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

export default TextDisplay;