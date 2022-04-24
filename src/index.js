import React from 'react';
import ReactDOM from 'react-dom';
// import ReactDOM from 'react-dom/client';   // если React 18
import App from './components/app/App';

import './style/style.sass';


ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );


// если React 18
// ReactDOM
//     .createRoot(document.getElementById('root'))
//     .render(
//         <React.Fragment>
//             <App />
//         </React.Fragment>        
//     );