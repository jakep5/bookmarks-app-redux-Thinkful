import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import EditBookmark from './EditBookmark/EditBookmark';
import BookmarksContext from './BookmarksContext/BookmarksContext';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';

const bookmarks = [
  // {
  //   id: 0,
  //   title: 'Google',
  //   url: 'http://www.google.com',
  //   rating: '3',
  //   desc: 'Internet-related services and products.'
  // },
  // {
  //   id: 1,
  //   title: 'Thinkful',
  //   url: 'http://www.thinkful.com',
  //   rating: '5',
  //   desc: '1-on-1 learning to accelerate your way to a new high-growth tech career!'
  // },
  // {
  //   id: 2,
  //   title: 'Github',
  //   url: 'http://www.github.com',
  //   rating: '4',
  //   desc: 'brings together the world\'s largest community of developers.'
  // }
];

class App extends Component {

  render() {
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
            <Nav />
            <div className='content' aria-live='polite'>
              <Route
                path='/add-bookmark'
                component={AddBookmark}
                  />
              <Route
                exact
                path='/'
                component={BookmarkList}
              />
              <Route
                exact
                path='/edit-bookmark/:bookmarkId'
                component={EditBookmark}
              />
          </div>
      </main>
    );
  }
}

export default App;
