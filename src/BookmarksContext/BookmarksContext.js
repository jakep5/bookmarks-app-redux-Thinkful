import React from 'react'

const BookmarksContext = React.createContext({
    bookmarks: [],
    addBookmark: () => {},
    deleteBookmark: () => {} //these make the shape of the context ready
})

export default BookmarksContext
