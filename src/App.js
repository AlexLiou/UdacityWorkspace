import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import List from './List'
import SearchPage from './SearchPage'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll()
	this.setState({
      books
      })
  }

  handleShelfUpdate = (book, shelf) => {
    const index = this.state.books.indexOf(book)
    const updatedBooks = [...this.state.books]
    
    if (shelf === 'none') {
      // Removes books
      updatedBooks.splice(index, 1)
    } else if (book.shelf === 'none') {
      const updatedBook = {...book, shelf}
      updatedBooks.push(updatedBook)
    } else {
      //updates shelf location
      const updatedBook = {...book, shelf}
      //overwrite existing books
      updatedBooks[index] = updatedBook
    }
    
    BooksAPI.update(book, shelf).then(() => {
      this.setState({
        books: updatedBooks
      })
    })
  }

  render() {
    return (
    	<BrowserRouter basename={process.env.REACT_APP_BASENAME}>
    		<div className='app'>
    			<Route exact path='/' render={() => (
                  <List books={this.state.books} onShelfUpdate={this.handleShelfUpdate} />
                )} />
				<Route path='/search' render={() => (
                   <SearchPage books={this.state.books} onShelfUpdate={this.handleShelfUpdate} />
                )} />
    		</div>
    	</BrowserRouter>
    )
  }
}

export default BooksApp