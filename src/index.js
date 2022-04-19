import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';

import './style/style.sass';


ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );


// ReactDOM.render(     // до 18 reacta
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );