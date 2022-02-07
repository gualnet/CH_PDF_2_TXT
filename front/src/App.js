import React from 'react';
import { Container } from '@mui/material';

import './App.css';
import UploadForm from './components/UploadForm/UploadForm';

function App() {
  return (
    <div className="App">
      <Container>
        MY NEW APP
        <UploadForm />
      </Container>
    </div>
  );
}

export default App;
