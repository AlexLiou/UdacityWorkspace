import React from 'react';
import {Link} from 'react-router-dom';
import notFound from './images/stacked-books.jpg';

const NotFound = () => (
  <div>
  	<h1 className="not-found-title">
  		Book not Found
  	</h1>
  	<figure className="not-found-img">
  		<img src={notFound} alt="Page Not Found" />
		<figcaption>
			Photo from clipartix.com
		</figcaption>
  	</figure>
	<div className="home-link">
		<Link to="/">Return home and try again</Link>
	</div>
  </div>
);

export default NotFound;