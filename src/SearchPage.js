import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Books from './Books.js';
import * as BooksAPI from './BooksAPI';

class SearchPage extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  };

	state = {
      query: '',
      newBooks: [],
      searchError: false
    };

	getBooks = event => {
      const query = event.target.value;
      this.setState({query});
      
      if (query) {
        BooksAPI.search(query.trim(), 20).then(books => {
          books.length > 0 ? this.setState({newBooks: books, searchError: false})
          : this.setState({newBooks: [], searchError: true});
        });
        
      } else this.setState({newBooks: [], searchError: false});
    };

	render() {
      const {query, newBooks, searchError} = this.state;
		const {books, changeShelf} = this.props;

		return (
          <div className="search-books">
          	<div className="search-books-bar">
          		<Link className="close-search" to="/">
          			Close
          		</Link>
          		<div className="search-books-input-wrapper">
          			<input
          				type="text"
          				placeholder="Search by title or author"
          				value={query}
						onChange={this.getBooks}
       				/>
          		</div>
          	</div>
			<div className="search-books-results">
				{newBooks.length > 0 && (
                 	<div>
                 		<h3>Search returned {newBooks.length} books</h3>
						<ol className="books-grid">
							{newBooks.map(book =>(
                             	<Books
                             		book={book}
									books={books}
									key={book.id}
									changeShelf={changeShelf}
								/>
                             ))}
						</ol>
                 	</div>
                 )}
				{searchError && (
                 	<h3>Search did not return any books. Please try again!</h3>
                 )}
			</div>
          </div>
        );
    }
}

export default SearchPage