
import { useState, useEffect } from 'react';
import { getAll, update } from './BooksAPI';
import BookShelf from './BookShelf';
import Search from './Search';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [userBooks, setUserBooks] = useState(null);
  const [shelf, setShelf] = useState(null);
  const [loader, setLoader] = useState(false);

  function onChangeShelf(book, selectedShelf) {
    setLoader(true);
    const previousShelf = book.shelf && book.shelf;
    update(book, selectedShelf).then(books => {
      setShelf(books);
      fireToast(previousShelf , selectedShelf);
    });
    }
  
    function fireToast(previousShelf, currentShelf) {
      previousShelf = previousShelf == undefined ? 'None' : previousShelf;   
      toast.success( `Book moved from ${previousShelf} to ${currentShelf}` ,{autoClose:2000});
    }

  useEffect(() => {
    async function getAllBooks() {
      await getAll().then((books) => {
        setUserBooks(books);
      })
      setLoader(false);
    }
    getAllBooks();
  }, [shelf]);


  return (
    <div className="app">
      <Routes>
        <Route
          path='/'
          element={
            <BookShelf
              userBooks={userBooks}
              onChangeShelf={onChangeShelf}
              loader={loader}
            />
          }
        />
        <Route
          path='/search'
          element={
            <Search
              currentBooks={userBooks}
              onChangeShelf={onChangeShelf}
              loader={loader}
              setLoader={setLoader}
            />
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
