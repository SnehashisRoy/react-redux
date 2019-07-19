import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import listings from './components/listings/Listings';
import configureStore from './redux/store/configureStore';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import EditListing from './components/listings/Edit-listing';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const store = configureStore(); // You can also pass in an initialState here
render(
    <Provider store={store}>
        <Router>
            <Route path="/" exact component={listings} />
            <Route path="/edit/:id" component={EditListing} />
        </Router>
    </Provider>,
    document.getElementById('root')
);
