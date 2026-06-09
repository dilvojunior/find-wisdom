import React, { useState, useEffect } from 'react';
import SearchBox from './Components/search-box/SearchBox';
import BooksModal from './Components/books-modal/BooksModal';
import Navigation from './Components/navigation/Navigation';
import Login from './login/Login';
import ParticlesApp from './Components/particles/ParticlesApp';
import './App.css';
import 'tachyons';
import './index.css';


function App() {
  const [books, setBooks] = useState([]);
  const [searchfield, setSearchfield] = useState('');
  const [searchBooks, setSearchBooks] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(limit);
  const [totalPages, setTotalPages] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSearch = () => {
    setSearchBooks(true);
  };

  useEffect(() => {
    setPage(0);
  }, []);

  useEffect(() => {
    searchBooks &&  
      setLoading(true);
      const fetchBooks = async () => {
        try {
          const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchfield)}&key=AIzaSyBwJ53X3ZvWnsELBSWuJgobvrLu2ES-pvo&startIndex=${page*limit}&maxResults=${limit}`);
          const result = await response.json();
          setBooks(result.items);
          setSearchBooks(false);
          setLoading(false);
          setTotalItems(result.totalItems || 0);
          setTotalPages(Math.ceil(result.totalItems / limit));
        } catch (error) {
          console.error('Error fetching books:', error);
          setLoading(false);
        }
      };
      fetchBooks();
  }, [searchBooks, limit, page]);

  // const isSearchValid = searchfield && searchfield.length > 3;

  const handleSignOut = () => {
    setIsSignedIn(false); 
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    setIsSignedIn(true); 
  };

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };

  const openModal = (book) => {
    setSelectedBook(book);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedBook(null);
  };

  const firstPageButton = (
    <button
      onClick={() => setPage(0)}
      disabled={page === 0}
      className={`f5 link dim mr3 ml3 br2 ph3 pv2 mb2 dib white bg-black pointer ${page === 0 ? 'o-50' : ''}`}
    >
      First Page
    </button>
  );

  const windowSize = 5;
  const startPage = Math.max(1, page - Math.floor(windowSize / 2));
  const endPage = Math.min(30, startPage + windowSize + 1);
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const pageButtons = pageNumbers.map(pages => (
    <button
      onClick={() => setPage(pages - 1)}
      key={pages}
      className={`f5 br3 ph3 pv2 mb2 dib ${page + 1 === pages ? 'bg-black white b' : 'near-black bg-light-white black hover-bg-white pointer'}`}
    >
      {pages}
    </button>
  ));

  const lastPageButton = (
    <button
      onClick={() => setPage(29)}
      disabled={page === 29}
      className={`f5 link dim mr3 ml3 br2 ph3 pv2 mb2 dib white bg-black pointer ${page === 30 ? 'o-50' : ''}`}
    >
      Last Page
    </button>
  );

  return (
    <div>
      {isSignedIn ? (
    <div>
    <ParticlesApp />
    <Navigation handleSignOut={handleSignOut} />
    <div style={{fontSize: '1.2vw'}} className="black-90 pv4 ph3 ph5-ns tc">
      <h1 style={{ 
        fontFamily: 'Roboto Slab, Serif' }}>Find Wisdom</h1>
      <p>just type.</p>
      <SearchBox searchChange={onSearchChange} />
      <div className="mt3">
      <button onClick={handleSearch}>Search</button>
      </div>
      {books && (
        <div className="flex justify-center mt2">
          <button
            className="f5 link dim br2 ba bw1 ph3 pv2 mb2 mr2 dib near-black bg-light-white pointer" 
            onClick={() => setPage((page > 0 ? page - 1 : 0))}
          >
            Back Page
          </button>
          <button 
            className="f5 link dim br2 ba bw1 ph3 pv2 mb2 mr2 dib near-black bg-light-white pointer" 
            onClick={() => setPage(page + 1)}
          >
            Next Page
          </button>
        </div>
      )}
      {loading && <p>Loading...</p>}
      <div className="flex flex-wrap justify-center">
        {books && books.map((book) => (
          <div  
            className="pa4"
            style={{ 
            width: '14vw',
            margin: '1rem',
            flex: '0 0 auto'
          }}  key={book.id}>
            <a onClick={() => openModal(book)}>
              <div  
                className={`w-100 br4 h5 flex items-center justify-center grow pointer ${book.volumeInfo.imageLinks?.thumbnail ? '' : 'bg-white'}`}
              >
                {book.volumeInfo.imageLinks?.thumbnail ? (
                  <img className="w-100 br4" src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                ) : (
                  <p className="tc gray f6">{book.volumeInfo.title}</p>
                )}
              </div>
            </a>
          </div>
        ))}
      </div>
        {books && (
      <div>
        {firstPageButton}
        {pageButtons}
        {lastPageButton}
      </div>
    )}
    </div>
      <BooksModal isOpen={isOpen} closeModal={closeModal} selectedBook={selectedBook} />
      </div>
      ) : (
      <div>
      <ParticlesApp />
      <Login handleSignIn={handleSignIn} isSignedIn={isSignedIn} />
      </div>
      )}
    </div>
    
  );
}

export default App;
        