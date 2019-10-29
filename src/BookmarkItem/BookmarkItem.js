import React from 'react';
import Rating from '../Rating/Rating';
import BookmarksContext from '../BookmarksContext/BookmarksContext';
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

export default function BookmarkItem(props) {
  return (
    <BookmarksContext.Consumer>
      {(context) => (
        <li className='BookmarkItem'>
          <div className='BookmarkItem__row'>
            <h3 className='BookmarkItem__title'>
              <a
                href={props.url}
                target='_blank'
                rel='noopener noreferrer'>
                {props.title}
              </a>
            </h3>
            <Rating value={props.rating} />
          </div>
          <p className='BookmarkItem__description'>
            {props.description}
          </p>
          <div className='BookmarkItem__buttons'>
            <button
              className='BookmarkItem__description'
              onClick={() => {
                deleteBookmarkRequest(
                  props.id,
                  context.deleteBookmark,
                )
              }}
            >
              Delete
            </button>
          </div>
        </li>
      )}
    </BookmarksContext.Consumer>
  )
}

BookmarkItem.defaultProps = {
  onClickDelete: () => {},
  rating: 1,
  description: ''
};

BookmarkItem.PropTypes = {
  title: PropTypes.string.isRequired,
  url: (props, propName, componentName) => {
    const prop = props[propName];

    if(!prop) {
      return new Error(`error`);
    }
    if(typeof prop != 'string') {
      return new Error(`Invalid prop`);
    }
    if (prop.length < 5 || !prop.match(new RegExp(/^https?:\/\//))) {
      return new Error(`error`);
    }
  },
  rating: PropTypes.number,
  description: PropTypes.string
}
