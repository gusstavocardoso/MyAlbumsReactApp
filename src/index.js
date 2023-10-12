import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Este arquivo pode conter estilos globais, se necessário.
import App from './App'; // Importe o componente principal do seu aplicativo.

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
