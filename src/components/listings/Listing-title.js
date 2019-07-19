import React from 'react';
import {Link} from 'react-router-dom';


export default function(props){

    let listing = props.listing;

       return ( 
                <div>
                  <p>{listing.title}</p>
                  <button onClick={() => this.handleDeleteListing(listing.id)}>Delete</button>
                  <button><Link  to={`/edit/${listing.id}`}>Edit</Link></button>
                </div>
             );
    
    
}