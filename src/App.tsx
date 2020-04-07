import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Header } from './components/header/Header';
import { Upload } from './components/upload/Upload';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Upload></Upload>
    </div>
  );
}

export default App;
