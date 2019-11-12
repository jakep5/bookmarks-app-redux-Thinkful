import React from 'react';
import { BookmarksContext, BookmarksConsumer } from '../BookmarksContext/BookmarksContext';
import './EditBookmark.css';
import config from '../config';



class EditBookmark extends React.Component {
    static contextType = BookmarksContext

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            title: '',
            url: '',
            description: '',
            rating: null
        }
    }

    componentDidMount() {
        fetch(config.API_ENDPOINT + `/${this.props.match.params.bookmarkId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        })
        .then(response => {
            if(!response.ok) {
                throw new Error(response.status)
            }
            return response.json()
        })
        .then(response => {
            this.handleFetch(response)
        })
    }

    handleFetch = (bookmark) => {
        this.setState({
            id: bookmark.id,
            title: bookmark.title,
            url: bookmark.url,
            description: bookmark.description,
            rating: bookmark.rating
        })
    }

    handleChangeTitle = e => {
        this.setState({
            title: e.target.value
        })
    }

    handleChangeUrl = e => {
        this.setState({
            url: e.target.value
        })
    }

    handleChangeDescription = e => {
        this.setState({
            description: e.target.value
        })
    }

    handleChangeRating = e => {
        this.setState({
            rating: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        window.history.back();
        let bookmarkId = this.state.id
        fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                title: this.state.title,
                url: this.state.url,
                description: this.state.description,
                rating: this.state.rating
            })
        })
        .then(response => {
            if(!response.ok) {
                throw new Error
            }
            return response.json();
        })
        .then(updatedBookmark => this.context.updateAfterPatch(updatedBookmark, bookmarkId))
        .catch(error => {
            console.log(error)
        })
        }
       /*  const bookmarkObject = {
            title: document.getElementById('title').value,
            url: document.getElementById('url').value,
            description: document.getElementById('description').value,
            rating: document.getElementById('rating').value
        }
        console.log(bookmarkObject)
        this.context.patchBookmark(bookmarkObject, bookmarkId) */
        /* fetch(config.API_ENDPOINT + `/${this.props.match.params.bookmarkId}`), {
            method: 'PATCH',
            headers: {
                'content-type':'application/json',
            }
        } */



    render() {
        const { title, url, description, rating} = this.state

        return (
            <BookmarksConsumer>
                {context => (
                    <section className="editBookmarkForm">
                        <h2>Edit Bookmark</h2>
                        <p>You are editing the '{title}' bookmark</p>
                        <div className="formHolder">
                            <form 
                                className="editForm"
                                id="editForm"
                                onSubmit={(e) => this.handleSubmit(e)}
                            >
                                <label htmlFor="title">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={title}
                                    placeholder={title}
                                    onChange={(e) => this.handleChangeTitle(e)}
                                />

                                <label htmlFor="url">
                                    URL
                                </label>
                                <input
                                    type="text"
                                    name="url"
                                    id="url"
                                    value={url}
                                    placeholder={url}
                                    onChange={(e) => this.handleChangeUrl(e)}
                                />

                                <label htmlFor="description">
                                    Description
                                </label>
                                <input 
                                    type="text"
                                    name="description"
                                    id="description"
                                    value={description}
                                    placeholder={description}
                                    onChange={(e) => this.handleChangeDescription(e)}
                                />

                                <label htmlFor="rating">
                                    Rating
                                </label>
                                <input
                                    type="number"
                                    name="rating"
                                    id="rating"
                                    value={rating}
                                    placeholder={rating}
                                    onChange ={(e) => this.handleChangeRating(e)}
                                />
                                <input type="submit" value="Submit changes"/>
                            </form>
                        </div>
                    </section>
                )}
            </BookmarksConsumer>
        )
    }
}

export default EditBookmark;