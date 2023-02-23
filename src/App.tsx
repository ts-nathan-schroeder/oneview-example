import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthType, init } from '@thoughtspot/visual-embed-sdk';
import SearchApp from './reports/search_app';

function App() {
  const thoughtspot_URL = "https://se-thoughtspot-cloud.thoughtspot.cloud/" 

  init({
    thoughtSpotHost: thoughtspot_URL,
    authType: AuthType.None,
    callPrefetch: true,
  });

  return (
    <div className="App">
      <SearchApp tsURL={thoughtspot_URL}></SearchApp>
    </div>
  );
}

export default App;
