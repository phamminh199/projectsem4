import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
);
reportWebVitals();
{/* <React.StrictMode>
</React.StrictMode>  để khi nó console log ko phải lặp lại 2 lần*/}
