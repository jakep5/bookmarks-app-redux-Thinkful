import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {BookmarksProvider} from './BookmarksContext/BookmarksContext';
import './index.css';
import App from './App';


ReactDOM.render(
  <BrowserRouter>
    <BookmarksProvider>
      <App />
    </BookmarksProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
