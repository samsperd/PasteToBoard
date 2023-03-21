import React from 'react';
import Preview from '../../components/Preview';
import './Popup.css';

const Popup = () => {
  return (
    <div className="App">
      <div className="App-header">
        Paste To Board
      </div>
      <div className="flex items-start h-full">
        <Preview />
      </div>
    </div>
  );
};

export default Popup;

