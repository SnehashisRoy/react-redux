import React, {Component} from 'react';
import {connect} from 'react-redux';
import {listingsFetchData, deleteListing} from '../../redux/actions/listings';
import {Link} from 'react-router-dom';

import ListingTitle from './Listing-title';


 class Listings extends Component {

    componentDidMount(){

        this.props.fetchData();

    }


    render(){

        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }
        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        return (
            <>
                <div className="jumbotron text-center"> <h3>List of Listings</h3></div>
                <div className="container">
                <Link  to={`/edit/create`}>create</Link>
                        {this.props.listings.map( listing => <ListingTitle key={listing.id} listing={listing}/>)}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listings: state.listings,
        hasErrored: state.listingsErrored,
        isLoading: state.listingsIsLoading

    };
};

const mapDispatchToprops = (dispatch)=>{

    return {
        fetchData: ()=> dispatch(listingsFetchData()),
        deleteListing: (url)=>dispatch(deleteListing(url))
    };

};

export default connect(mapStateToProps, mapDispatchToprops)(Listings);