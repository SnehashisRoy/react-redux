
import Fetch from './fetch';

const API_BASE_ADDRESS = 'http://127.0.0.1:8085/api/';

export default class Listings {
    static geListing() {
        
    }

    static updateListing(values){

        const uri = API_BASE_ADDRESS+ 'listing/edit/'+ values.id ;

        return Fetch.postData(uri, values);

    }
}