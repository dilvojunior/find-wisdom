import React, { useEffect } from 'react';

const BookModal = ({ isOpen, closeModal, selectedBook }) => {
  
  useEffect(() => {
    const keyCloseModal = (event) => {
      if (event.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', keyCloseModal);
    }

    return () => {
      window.removeEventListener('keydown', keyCloseModal);
    };
  }, [isOpen]);
  
  
  if (!isOpen || !selectedBook) {
    return null;
  }

  return (
    <div className="modal-overlay flex justify-center items-center bg-black-50 fixed top-0 left-0 w-100 h-100" onClick={closeModal}>
      <div className="modal-content bg-light-gray pa4 br3 w-90 w-50-m w-40-l" onClick={(e) => e.stopPropagation()}>
        <button className="close-button absolute top-1 right-1 bg-transparent bn f4 pointer" onClick={closeModal}>X</button>
        <div className='tc'>
        <h2>{selectedBook.volumeInfo.title}</h2>
        <p><strong>Author:</strong> {selectedBook.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
        <div className="overflow-auto h5 pa3 bg-light-gray br2">
        <p><strong>Description:</strong> {selectedBook.volumeInfo.description || 'No description available'}</p>
        </div>
        {selectedBook.saleInfo?.listPrice && (
          <p><strong>Price:</strong> ${selectedBook.saleInfo.listPrice.amount}</p>
        )}
        <p><strong>More Info:</strong> <a href={selectedBook.volumeInfo.infoLink}>Link</a></p>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
