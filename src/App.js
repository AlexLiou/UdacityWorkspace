import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import NotFound from './NotFound.js';
import SearchPage from './SearchPage.js';
import Library from './Library.js';
import {Link} from 'react-router-dom';
import Books from './Books'

class BooksApp extends React.Component {
  state = {
    books: []
  };

	componentDidMount() {
      Books.API.getAll().then(books => this.setState({books}));
    }

	changeShelf = (changedBook, shelf) => {
      BooksAPI.update(changedBook, shelf).then(response => {
        changedBook.shelf = shelf;
        this.setState(prevState => ({
          books: prevState.book
          	.filter(book => book.id !== changedBook.id)
          	.concat(changedBook)
        }));
      });
    };
  render() {
    
    const { books } = this.state;
    return (
      <div className="app">
      	<Switch>
      		<Route
      			path="/search"
      			render={() => (
      				<SearchPage books={books} changeShelf={this.changeShelf}/>
    			)}
			/>
			<Route
				exact path="/"
				render={() => (
                  <div className="list-books">
                  	<div className="list-books-title">
                  		<h1>MyReads</h1>
                  	</div>
                  	<Library books={books} changeShelf={this.changeShelf}/>
					<div className="open-search">
						<Link to="/search">Search</Link>
					</div>
                  </div>
                )}
			/>
			<Route component={NotFound}/>
      	</Switch>
      </div>
    )
  }
}

export default BooksApp
