import React from 'react';
import PropTypes from 'prop-types';
import noCover from './no-cover-image.png';
import ChangeShelfMenu from './ChangeShelfMenu.js';

const Books = props => {
  const {book, books, changeShelf} = props;
  
  const coverImg = 
        book.imageLinks && book.imageLinks.thumbnail
  		? book.imageLinks.thumbnail
  		: noCover;
  const title = book.title ? book.title : 'No title available';
  
  return (
    <li>
    	<div className="book">
    		<div className="book-top">
    			<div 
    				className="book-cover"
    				style={{ backgroundImage: `url(${coverImg})`}}
				/>
				<ChangeShelfMenu book={book} books={books} changeShelf={changeShelf} />
    		</div>
			<div className="book-title">{title}</div>
			{
			book.authors &&
				book.authors.map((author, index) => (
				<div className="book-authors" key={index}>
					{author}
				</div>
			))}
    	</div>
    </li>
  );
};

Books.propTypes = {
  book: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired
};

export default Books