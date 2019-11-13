import React from 'react';
import config from '../config'

export const BookmarksContext = React.createContext();

export class BookmarksProvider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bookmarks: [],
            error: null,
        }
    };


    updateAfterPatch = (updatedBookmark, bookmarkId) => {
        console.log('reloading');
        const newBookmarks = this.state.bookmarks.map(bmrk =>
            (bmrk.id === bookmarkId)
                ? updatedBookmark
                : bmrk
            )
            this.setState({
                bookmarks: newBookmarks
            });
        window.location.reload();
    };

    setBookmarks = bookmarks => {
        this.setState({
            bookmarks,
            error: null,
        })
    }

    addBookmark = bookmark => {
        this.setState({
            bookmarks: [ ...this.state.bookmarks, bookmark ],
        })
    }

    deleteBookmark = bookmarkId => {
        const newBookmarks = this.state.bookmarks.filter(bm =>
            bm.id !== bookmarkId
        )
        this.setState({
            bookmarks: newBookmarks
        })
    }

    componentDidMount() {
        fetch(config.API_ENDPOINT, {
            method: 'GET',
            headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => {
        if (!res.ok) {
            throw new Error(res.status)
        }
        return res.json()
        })
        .then(this.setBookmarks)
        .catch(error => this.setState({ error }))
    }
    render() {
        const contextValue = {
            bookmarks: this.state.bookmarks,
            addBookmark: this.addBookmark,
            deleteBookmark: this.deleteBookmark,
            updateAfterPatch: this.updateAfterPatch,
        }

        return (
            <BookmarksContext.Provider
                value = {contextValue}
            >
                {this.props.children}
            </BookmarksContext.Provider>
        )
    }


     //these make the shape of the context ready

}


export const BookmarksConsumer = BookmarksContext.Consumer;


