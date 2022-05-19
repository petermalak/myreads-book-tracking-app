import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import Book from './Book';
import Loader from './Loader';

const BookShelf = ({ userBooks, onChangeShelf, loader  }) => {

    const current_reading_shelf = userBooks && userBooks.filter(book => book.shelf === "currentlyReading");
    const want_to_read_shelf = userBooks && userBooks.filter(book => book.shelf === "wantToRead");
    const read_shelf = userBooks && userBooks.filter(book => book.shelf === "read");

    return (
        <div className="list-books">
            {loader && <Loader />}
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {current_reading_shelf && current_reading_shelf.map((book, index) => {
                                    return <Book key={index} book={book} onChangeShelf={onChangeShelf} />
                                })}
                            </ol>
                        </div>
                    </div>

                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {want_to_read_shelf && want_to_read_shelf.map((book, index) => {
                                    return <Book key={index} book={book} onChangeShelf={onChangeShelf} />
                                })}
                            </ol>
                        </div>
                    </div>

                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {read_shelf && read_shelf.map((book, index) => {
                                    return <Book key={index} book={book} onChangeShelf={onChangeShelf} />
                                })}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">
                    Add a book
                </Link>

            </div>
        </div>
    );
};

BookShelf.propTypes = {
    userBooks: PropTypes.array,
    onChangeShelf: PropTypes.func.isRequired,
};

export default BookShelf;
