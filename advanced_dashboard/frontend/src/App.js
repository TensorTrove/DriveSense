import Homepage from "./components/homepage";
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homebtn from "./components/homebtn";
import Chatpage from "./components/chatpage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Homepage} />
          <Route path='/chat' Component={Chatpage} />
        </Routes>
      </BrowserRouter>
      <Homebtn/>
    </div>
  );
}

export default App;
