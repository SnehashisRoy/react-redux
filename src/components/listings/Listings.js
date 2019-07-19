import React, {Component} from 'react';
import {connect} from 'react-redux';
import {listingsFetchData, deleteListing} from '../../redux/actions/listings';

import ListingTitle from './Listing-title';
import Header from '../Header';


 class Listings extends Component {

    componentDidMount(){

        this.props.fetchData();

    }

    handleDeleteListing(id){

        console.log(id);


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
            <Header/>
                <div className="container">
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