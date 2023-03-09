import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Main from "./pages/Main";
import Setting from "./pages/Setting";

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Home/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/setting" element={<Setting/>}/>
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
