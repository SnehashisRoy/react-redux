import {LISTINGS_ERRORED,
        LISTINGS_IS_LOADING, 
        LISTINGS_FETCH_SUCCESS,
        LISTING_DELETING_ERRORED,
        LISTING_IS_DELETING,
        LISTING_DELETED,
        LISTING_UPDATED,
        LISTING_UPDATE_ERRORED,
        LISTING_IS_UPDATING
        } from '../actions/actionTypes';

export function listingsErrored(state=false, action){

    switch(action.type){
        case LISTINGS_ERRORED:
            return action.hasErrored;
        default:
            return state;
    }

}

export function listingsIsLoading(state=false, action){
    switch(action.type){
        case LISTINGS_IS_LOADING:
                return action.isLoading;
            default:
                return state;
    }
}

export function listings(state=[], action){

    switch(action.type){
        case LISTINGS_FETCH_SUCCESS:
            return action.listings;
        case LISTING_DELETED:{
            let listings =  [...state];
            return listings.filter(listing => listing.id !== action.id ); }
        case LISTING_UPDATED:{
            let listings =  [...state];
           return [...listings].map((val) => {
                if(val.id == action.listing.id){
                    return action.listing;
                }
                return val;
            })}

        default:
            return state;
    }

}

export function listingUpdateErrored(state=false, action){

    switch(action.type){
        case LISTING_UPDATE_ERRORED:
            return action.hasErrored;
        default:
            return state;
    }

}

export function listingIsUpdating(state=false, action){
    switch(action.type){
        case LISTING_IS_UPDATING:
            return action.isLoading;
        default:
            return state;
    }
}

export function listingDeletingErrored(state=false, action){

    switch(action.type){
        case LISTING_DELETING_ERRORED:
            return action.hasErrored;
        default:
            return state;
    }
          
}

export function listingIsDeleting(state=false, action){

    switch(action.type){
        case LISTING_IS_DELETING:
                return action.isLoading;
        default:
            return state 
    }
}