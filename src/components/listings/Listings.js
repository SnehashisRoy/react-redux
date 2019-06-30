import React, {Component} from 'react';
import {connect} from 'react-redux';
import {listingsFetchData, deleteListing} from '../../redux/actions/listings';

import ListingTitle from './Listing-title';


 class Listings extends Component {

    componentDidMount(){

        this.props.fetchData('http://127.0.0.1:8085/api/listings');

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
            
            this.props.listings.map( listing => <ListingTitle key={listing.id} listing={listing}/>)
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
        fetchData: (url)=> dispatch(listingsFetchData(url)),
        deleteListing: (url)=>dispatch(deleteListing(url))
    };

};

export default connect(mapStateToProps, mapDispatchToprops)(Listings);