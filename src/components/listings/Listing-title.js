import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {deleteListing} from '../../redux/actions/listings';



class ListTitle extends Component {


  render(){
    if(this.props.isLoading){
      return (<div>Loading...</div>)
    }
    if(this.props.hasErrored){
      return (<div>Error deleting the listing . Check later.</div>)
    }

    return ( 
      <div className="row mb-2">
        <div className="col-8">
        <Link  className="txt-primary pointer" to={`/edit/${this.props.listing.id}`}><p>{this.props.listing.title}</p></Link>
        </div>
        <div className="col-2">
        
          <a onClick={()=>this.props.deleteListing(this.props.listing.id)} ><i className="far fa-trash-alt"></i></a>
        </div>
        <div className="col-2">
       
          <Link  to={`/edit/${this.props.listing.id}`}> <i className="far fa-edit"></i></Link>
        </div>
      </div>
   );


  }
}

const mapStateToProps = (state, ownProp) => {
  const {listing} = ownProp;
  return {
      listing: state.listings.find(v => v.id == listing.id),
      isLoading: state.listingIsDeleting,
      hasErrored: state.listingDeletingErrored
  };
};

const mapDispatchToprops = (dispatch)=>{

  return {
      deleteListing: (id)=>dispatch(deleteListing(id))
  };

};


export default connect(mapStateToProps , mapDispatchToprops)(ListTitle);