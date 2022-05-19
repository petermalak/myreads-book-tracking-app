import PropTypes from "prop-types";
import BookShelfSelector from "./BookShelfSelector";

const Book = ({ book, onChangeShelf }) => {

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ (book.imageLinks && book.imageLinks.thumbnail) || '/fallback.jpg'})` }}></div>
                    <BookShelfSelector currentShelf={book.shelf} book={book} onChangeShelf={onChangeShelf} />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                    {book.authors && book.authors.map((author, index) => <span key={index}>{author} <br /></span>)}
                </div>
            </div>
        </li>
    );
};

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
};

export default Book;
