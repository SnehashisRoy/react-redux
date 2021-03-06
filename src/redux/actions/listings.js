import {LISTINGS_ERRORED,
       LISTINGS_IS_LOADING,
        LISTINGS_FETCH_SUCCESS,
        LISTING_DELETING_ERRORED,
        LISTING_IS_DELETING,
        LISTING_DELETED,
        LISTING_UPDATE_ERRORED,
        LISTING_IS_UPDATING,
        LISTING_UPDATED,
        UPLOAD_IMAGES_ERRORED,
        IMAGES_ARE_UPLOADING,
        IMAGES_UPLOADED,
        CREATE_LISTING_ERRORED,
        LISTING_IS_CREATING,
        LISTING_CREATED,
        LISTING_BEING_UPDATED, 
        IMAGE_DELETED
        } from './actionTypes';
import Listings from '../../data/listings';

//import http$ from '../../http$';


export function listingBeingUpdated(id){
    return {
        type: LISTING_BEING_UPDATED,
        id
    }
}

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
            dispatch(listingBeingUpdated(listing.id));
            
            
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

//create listing

export function listingCreateErrored(bool){
    return {
        type: CREATE_LISTING_ERRORED,
        hasErrored: bool

    }
}

export function listingIsCreating(bool){
    return {
        type: LISTING_IS_CREATING,
        isLoading: bool
    }
}

export function listingCreatedSuccess(listing){
    return {
        type: LISTING_CREATED,
        listing
    }
}

export function createListing(payload){


    return (dispatch) => {

        dispatch(listingIsCreating(true));
        Listings.createListing(payload)
        .then(
            response=> response.json(),
            error => { 
                console.log('An error has occured.', error);
                dispatch(listingIsCreating(false));

            }
            )
        .then((listing) => {
            dispatch(listingIsCreating(false)); //weird solution to fight a bug in Formik , the action had to be called later
            dispatch(listingCreatedSuccess(listing));
            dispatch(listingBeingUpdated(listing.data.id));
            
            
        } );
               


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

export function deleteListing(id){

    return (dispatch)=>{
        
        dispatch(listingIsDeleting(true));
        Listings.deleteListing(id)
        .then( 
            response=> response.json(),
            error => { 
                console.log('An error has occured.', error);
                dispatch(listingIsDeleting(false));
                dispatch(listingDeletingErrored(true));

            }
            )
        .then((listings) => {
            dispatch(listingIsDeleting(false));
            dispatch(listingDeleted(id));
            
        } );
    }

}

export function uploadImagesErrored(bool){
      return {
          type: UPLOAD_IMAGES_ERRORED,
          hasErrored: bool
      }

}

export function imagesAreUploading(bool){
     return {
         type: IMAGES_ARE_UPLOADING,
         isLoading: bool
     }

}

export function imagesUploaded(listing){
    return {
        type: IMAGES_UPLOADED,
        listing
    }
}

export function uploadImages(payload){

    console.log(payload);

    return (dispatch)=>{

        dispatch(imagesAreUploading(true));
        Listings.uploadImages(payload)
        .then(
            response=> response.json(),
            error => { 
                console.log('An error has occured.', error);
                dispatch(imagesAreUploading(false));

            }
            )
        .then((listing) => {
            dispatch(imagesAreUploading(false)); //weird solution to fight a bug in Formik , the action had to be called later
            dispatch(imagesUploaded(listing));
            
        } );

    }

}

export function imageDeleted(id){

   return {
        type: IMAGE_DELETED,
        id
    }

}

export function deleteImage(id){

    return (dispatch)=>{

        Listings.deleteImage(id)
        .then(
            response=> response.json(),
            error => { 
                console.log('An error has occured.', error);

            }
            )
        .then((image) => {
            dispatch(imageDeleted(image.id));
            
        } );

    }

}


