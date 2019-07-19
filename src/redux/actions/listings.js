import {LISTINGS_ERRORED,
       LISTINGS_IS_LOADING,
        LISTINGS_FETCH_SUCCESS,
        LISTING_DELETING_ERRORED,
        LISTING_IS_DELETING,
        LISTING_DELETED,
        LISTING_UPDATE_ERRORED,
        LISTING_IS_UPDATING,
        LISTING_UPDATED
        } from './actionTypes';
import Listings from '../../data/listings';

//import http$ from '../../http$';

// fetching listings
export function listingsErrored(bool){

        return {
            type: LISTINGS_ERRORED,
            hasErrored: bool
        }

} 

export function listingsIsLoading(bool){

        return {
            type: LISTINGS_IS_LOADING,
            isLoading: bool
        }
}


export function listingsFetchSuccess(listings){
        return {
            type: LISTINGS_FETCH_SUCCESS,
            listings
        }

}

export function listingsFetchData(){

    return (dispatch)=>{
        // dispatch(listingsIsLoading(true));

        // fetch(url)
        //      .then((response) => {
        //          if(!response.ok){
        //              throw Error(response.statusText);
        //          }
        //          dispatch(listingsIsLoading(false));
        //          return response;
        //      })
        //      .then((response)=> response.json())
        //      .then((listings) => dispatch(listingsFetchSuccess(listings)) )
        //      .catch(()=> listingsErrored(true));
        dispatch(listingsIsLoading(true));
        Listings.getListings()
        .then( 
            response=> response.json(),
            error => { 
                console.log('An error has occured.', error);
                dispatch(listingsIsLoading(false));
                dispatch(listingsErrored(true))

            }
            )
        .then((listings) => {
            dispatch(listingsIsLoading(false));
            dispatch(listingsFetchSuccess(listings));
            
        } );
    }



}

//update listing

export function listingUpdateErrored(bool){
    return {
        type: LISTING_UPDATE_ERRORED,
        hasErrored: bool

    }
}

export function listingIsUpdating(bool){
    return {
        type: LISTING_IS_UPDATING,
        isLoading: bool
    }
}

export function listingUpdatedSuccess(listing){
    return {
        type: LISTING_UPDATED,
        listing
    }
}

export function updateListing(payload){


    return (dispatch) => {

        dispatch(listingIsUpdating(true));
        Listings.updateListing(payload)
        .then(
            response=> response.json(),
            error => { 
                console.log('An error has occured.', error);
                dispatch(listingIsUpdating(false));

            }
            )
        .then((listing) => {
            dispatch(listingIsUpdating(false)); //weird solution to fight a bug in Formik , the action had to be called later
            dispatch(listingUpdatedSuccess(listing));
            
        } );
               

        // dispatch(listingIsUpdating(true));
        // http$.post('http://banglatoronto.ca/api/listing/edi/'+ payload.id, payload).subscribe(
        //     resp => {
        //         if(typeof(resp) == 'string'){
        //             dispatch(listingIsUpdating(false));
        //             dispatch( listingUpdateErrored(true));
        //             setTimeout(()=>{
        //                 dispatch( listingUpdateErrored(false));
        //             }, 2000 )
        //         }else{
        //             dispatch(listingIsUpdating(false));
        //             dispatch(listingUpdatedSuccess(resp.response.data));
        //         };
        //     },
        //     err => {},
        //     ()=> {console.log('completed')}

        // )


    }

}


// deleting the listings


export  function listingDeletingErrored(bool){

        return {
            type: LISTING_DELETING_ERRORED,
            hasErrored: bool
        }

}

export function listingIsDeleting(bool){


        return {
            type: LISTING_IS_DELETING,
            isLoading: bool
        }
}

export function listingDeleted(id){
        return {
            type: LISTING_DELETED,
            id
        }
}

export function deleteListing(url){

    return (dispatch) => {

        dispatch(listingIsDeleting(true));

        fetch(url)
        .then((response) => {
            if(!response.ok){
                throw Error(response.statusText);
            }
            dispatch(listingIsDeleting(false));
            return response;
        })
        .then((response)=> response.json())
        .then((listing) => dispatch(listingDeleted(listing.id)) )
        .catch(()=> listingDeletingErrored(true));
    }

}