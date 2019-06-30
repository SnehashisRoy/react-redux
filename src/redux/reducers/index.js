import {combineReducers} from 'redux';
import {listingsErrored,
        listingsIsLoading, 
        listings,
        listingDeletingErrored,
        listingIsDeleting,
        listingUpdateErrored,
        listingIsUpdating
    } from './listings';

// function rootReducer(state = {}, action) {
//     return {
//       listingsErrored: listingsErrored(state.listingsErrored, action),
//       listingsIsLoading: listingsIsLoading(state.listingsIsLoading, action),
//       listings: listings(state.listings, action)
//     }
//   }

export default combineReducers({
    listingsErrored,
    listingsIsLoading,
    listings,
    listingDeletingErrored,
    listingIsDeleting, 
    listingIsUpdating,
    listingUpdateErrored

  })
  