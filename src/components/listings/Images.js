import React, {Component} from 'react';
import {deleteImage} from '../../redux/actions/listings'
import {connect} from 'react-redux';
import Image from './Image';

class Images extends Component {


    render(){

        

        return(
            <>
                <div className="jumbotron text-center">
                   <h2> Images For The Listing </h2>
                </div>

                <div className="container">
                    <div className="row">
                        {this.props.listing.images.map(image => {
                            return (
                               
                                <div className="col col-sm-4 col-md-3">
                                    <Image image={image}/> 
                                </div>
                            )
                        })}
                    </div>
                    
                    </div>

                
                
                    
            </>

        )
    }

}

const mapStateToProps = (state)=>{

    const {listings, listingBeingUpdated} = state;

    return {
        listing : listings.find( v =>  v.id == listingBeingUpdated)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteImage : (id) => dispatch(deleteImage(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Images);