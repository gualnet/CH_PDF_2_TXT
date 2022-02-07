import React from 'react';
import { Container } from '@mui/material';

import './App.css';
import UploadForm from './components/UploadForm/UploadForm';
import TextDisplay from './components/TextDisplay/TextDisplay';

function App() {
  return (
    <div className="App">
      <Container>
        MY NEW APP
        <UploadForm />
        <TextDisplay />
      </Container>
    </div>
  );
}

export default App;
