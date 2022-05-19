import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { search } from './BooksAPI';
import Book from './Book';
import Loader from './Loader';

const Search = ({ onChangeShelf, currentBooks , loader }) => {
    
    const [searchQuery, setSearchQuery] = useState('');
    const [resultBooks, setResultBooks] = useState(null);

    function getSearchResults(term) {
        if (term !== '') {
            search(term).then(result => {
                if (result.error) {
                    setResultBooks(null);
                    return;
                } else {
                    setResultBooks(result);
                }
            });
        } else {
            setResultBooks(null)
        }
    }

    function changeHandler(e) {
        setSearchQuery(e.target.value)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            getSearchResults(searchQuery);
        }, 100);

        return (() => clearTimeout(timer))
    }, [searchQuery])


    return (
        <div className="search-books">
            {loader && <Loader />}
            <div className="search-books-bar">
                <Link to="/" className="close-search">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input type="text" value={searchQuery} onChange={changeHandler} placeholder="Search by title or author" aria-label="Search Bar" />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {resultBooks && resultBooks.map(book => {
                        currentBooks.map(currentBook => {
                            if (currentBook.id === book.id) {
                                book.shelf = currentBook.shelf
                            }
                            return currentBook;
                        })
                        return <Book key={book.id} book={book} onChangeShelf={onChangeShelf} />
                    })}
                </ol>
            </div>
        </div>
    );
};

Search.propTypes = {
    currentBooks: PropTypes.array,
    onChangeShelf: PropTypes.func.isRequired,
};

export default Search;
