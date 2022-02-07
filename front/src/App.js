import React, { useState } from 'react';
import { Container } from '@mui/material';

import './App.css';
import UploadForm from './components/UploadForm/UploadForm';
import TextDisplay from './components/TextDisplay/TextDisplay';

function App() {

  const [uploadResult, setUploadResult] = useState();

  return (
    <div className="App">
      <Container>
        <UploadForm
          setUploadResult={setUploadResult}
        />
        <TextDisplay
          uploadResult={uploadResult}
        />
      </Container>
    </div>
  );
}

export default App;
