import React from 'react';
import Rating from '../Rating/Rating';
import { BookmarksContext, BookmarksConsumer } from '../BookmarksContext/BookmarksContext';
import config from '../config';
import PropTypes from 'prop-types'
import './BookmarkItem.css';

function deleteBookmarkRequest(bookmarkId, callback) {
  fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
    method: 'DELETE',
    headers: {
      'authorization' : `bearer ${config.API_KEY}`
    }
  })
    .then(response => {
      if(!response.ok) {
        return response.json().then(error => {
          throw error
        })
      }
      return response.json()
    })
    .then(data => {
      callback(bookmarkId)
    })
    .catch (error => {
      alert(error)
    })
}

export default class BookmarkItem extends React.Component {

  static contextType = BookmarksContext;

  render() {

  
    return (
      <BookmarksConsumer>
        {(context) => (
          <li className='BookmarkItem'>
            <div className='BookmarkItem__row'>
              <h3 className='BookmarkItem__title'>
                <a
                  href={this.props.url}
                  target='_blank'
                  rel='noopener noreferrer'>
                  {this.props.title}
                </a>
              </h3>
              <Rating value={this.props.rating} />
            </div>
            <p className='BookmarkItem__description'>
              {this.props.description}
            </p>
            <div className='BookmarkItem__buttons'>
              <button
                className='BookmarkItem__description'
                onClick={() => {
                  deleteBookmarkRequest(
                    this.props.id,
                    context.deleteBookmark,
                  )
                }}
              >
                Delete
              </button>
            </div>
          </li>
        )}
      </BookmarksConsumer>
    )
  }
}

