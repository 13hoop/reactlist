import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

function tick() {
  const element = (
    <div>
      <h2>{new Date().toLocaleTimeString()}</h2>
      <p> ---------- first react page by 13Hoop</p>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementsByClassName('content')[0]
  );
}

setInterval(tick, 1000);