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
        const listings =   this.props.listings;
        const hasListing = listings.length == 0 ? false : true;

        

        return (
            
            <>
            <div className="jumbotron text-center"> <h3>List of Listings</h3></div>
                <div className="container" >
            {
                hasListing && 
                
                <div className="row mb-2">
                    <div className="col-8">
                        <span style={{color: '#001f3f', fontWeight: 700}}><u>Ad</u></span>
                    </div>
                    <div className="col-2">
                    
                         <span style={{color: '#001f3f', fontWeight: 700}}><u>Delete</u></span>
                    </div>
                    <div className="col-2">
                
                         <span style={{color: '#001f3f', fontWeight: 700}}><u>Edit</u></span>
                    </div>
                </div>
            }
               { hasListing && listings.map( listing => <ListingTitle key={listing.id} listing={listing}/>)}
                <Link className="btn btn-success mt-3" to={`/edit/create`}>Create an Ad</Link>

                          
                
                        
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