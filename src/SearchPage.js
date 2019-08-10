import React from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import {Debounce} from 'react-throttle';


class SearchPage extends React.Component {
  
 state = {
   query: '',
   searchResults: []
 }
 
 queryBooks = (event) => {
   const query = event.target.value;
   this.setState({
     query
   });
   
   if (query) {
     BooksAPI.search(this.state.query.trim(), 20).then(searchResults => {
       const newSearchResults = searchResults.map( result => {
         const index = this.props.books.find(book => {
           return book.id === result.id;
         });
         if (index !== undefined) {
			return index;
         } else {
           return { ...result, shelf: 'none'};
         }
       });
       return newSearchResults;
     }).then(newSearchResults => {
    newSearchResults.length > 0 ? this.setState({searchResults: newSearchResults}) : this.setState({searchResults: []});
     }
     )
   } else this.setState({searchResults: []});
 }

 render() {
   const booksList = this.state.searchResults.length === 0 ? <li key="no-results">No results</li>
     : this.state.searchResults.map(book => {
   		return (
   			<li key={book.id}>
				<Book book={book} onShelfUpdate={this.props.onShelfUpdate} />
			</li>
   		);
		 });
	return (
      <div className="search-books">
      	<div className="search-books-bar">
      		<Link className="close-search" to="/"></Link>
      		<div className="search-books-input-wrapper">
      		<Debounce time="400" handler="onChange">
      			<input
      				type="text"
      				value={this.state.value}
					placeholder="Search by title or author"
      				onChange={this.queryBooks}
      			/>
			</Debounce>
      		</div>
      	</div>
		<div className="search-books-results">
			<ol className="books-grid">
				{booksList}
			</ol>
		</div>
      </div>
    );
 }
}


export default SearchPage