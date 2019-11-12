import React, { Component } from 'react';
import BookmarkItem from '../BookmarkItem/BookmarkItem';
import {Link} from 'react-router-dom';
import { BookmarksContext, BookmarksConsumer } from '../BookmarksContext/BookmarksContext';
import PropTypes from 'prop-types';
import './BookmarkList.css'

class BookmarkList extends Component {
  static contextType = BookmarksContext;

  render() {

    return (
      <BookmarksConsumer>
        {context => (
          <section className='BookmarkList'>
            <h2>Your bookmarks</h2>
            <ul className='BookmarkList__list' aria-live='polite'>
              {context.bookmarks.map(bookmark =>
                <div>
                  <BookmarkItem
                    key={bookmark.id}
                    {...bookmark}
                  />
                  <Link to={`/edit-bookmark/${bookmark.id}`}>
                    <button className="editBookmarkButton">Edit Bookmark</button>
                  </Link>
                </div>
              )}
            </ul>
          </section>
        )}
      </BookmarksConsumer>
    );
  }
}

BookmarkList.PropTypes = {
  bookmarks: PropTypes.array
}

export default BookmarkList;
