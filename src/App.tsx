import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthType, init } from '@thoughtspot/visual-embed-sdk';
import SearchApp from './reports/search_app';
import { Button, Stack } from '@mui/material';
import { Container } from '@mui/system';

function App() {
  const thoughtspot_URL = "https://se-thoughtspot-cloud.thoughtspot.cloud/" 

  const [selectedExperience,setSelectedExperience] = useState<string>('Search')

  init({
    thoughtSpotHost: thoughtspot_URL,
    authType: AuthType.None,
    callPrefetch: true,
  });

  return (
    <div className="App">
      {/* <Container>
        <Stack>
          <Button onClick={()=>setSelectedExperience('Search')}>
          Search
          </Button>
          <Button onClick={()=>setSelectedExperience('Search')}>
            Search
          </Button>x
          {selectedExperience == 'Search' ? 
          :
            
          }
        </Stack>
      </Container> */}

      <SearchApp tsURL={thoughtspot_URL}></SearchApp>

    </div>
  );
}

export default App;
