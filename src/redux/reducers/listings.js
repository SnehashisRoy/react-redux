import {LISTINGS_ERRORED,
        LISTINGS_IS_LOADING, 
        LISTINGS_FETCH_SUCCESS,
        LISTING_DELETING_ERRORED,
        LISTING_IS_DELETING,
        LISTING_DELETED,
        LISTING_UPDATED,
        LISTING_UPDATE_ERRORED,
        LISTING_IS_UPDATING,
        UPLOAD_IMAGES_ERRORED,
        IMAGES_ARE_UPLOADING,
        IMAGES_UPLOADED,
        CREATE_LISTING_ERRORED,
        LISTING_IS_CREATING,
        LISTING_CREATED,
        LISTING_BEING_UPDATED,
        IMAGE_DELETED

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
        case IMAGES_UPLOADED: {
            let listings =  [...state];
           return [...listings].map((val) => {
                if(val.id == action.listing.data.id){
                   
                    //deep copying is required 
                    let listing = {...val,
                             images:[
                                 ...action.listing.data.images
                             ] };
                    return listing;
                }
                return val;
            })
        
        
        }
        case IMAGE_DELETED: {
            let listings =  [...state];
            return [...listings].map((val) => {

                val.images.filter((img) => {
                    if(img.id != action.id){
                        return img;

                    }
                })

                return val;
            })

        }
        case LISTING_CREATED:{
            return  [...state, action.listing.data ];

        }
        default:
            return state;
    }

}

export function listingCreateErrored(state=false, action){

    switch(action.type){
        case CREATE_LISTING_ERRORED:
            return action.hasErrored;
        default:
            return state;
    }

}

export function listingIsCreating(state=false, action){
    switch(action.type){
        case LISTING_IS_CREATING:
            return action.isLoading;
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
            return state; 
    }
}

export function imagesAreUploading(state=false, action){
    switch(action.type){

        case IMAGES_ARE_UPLOADING:
            return action.isLoading;

        default:
            return state;
    }
}

export function imageUploadingErrored(state=false, action){
    switch(action.type){
        case UPLOAD_IMAGES_ERRORED:
            return action.hasErrored;
        default:
            return state; 
    }
}

export function listingBeingUpdated(state=null, action){
    switch(action.type){
        case LISTING_BEING_UPDATED:
            return action.id;
        default:
            return state;

    }
}