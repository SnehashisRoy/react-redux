import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


import {deleteListing, toggleDeleteModal} from '../../redux/actions/listings';



class ListTitle extends Component {

  constructor(props){

      super(props);
      this.state ={
        openDeleteModal: false
      }

  }

  showModal = () => {
    this.setState({openDeleteModal: true});
  }
  hideModal = () => {
    this.setState({openDeleteModal: false})
  }

  deleteListing = ()=>{
   this.setState({openDeleteModal: false})
    this.props.deleteListing(this.props.listing.id);
  }

  


  render(){
    if(this.props.isLoading){
      return (<div>Loading...</div>)
    }
    if(this.props.hasErrored){
      return (<div>Error deleting the listing . Check later.</div>)
    }

    return ( 
      <>
      <Modal show={this.state.openDeleteModal} onClick={this.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Listing</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete the listing?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.hideModal}>
            Close
          </Button>
          <Button onClick={this.deleteListing} variant="primary">
            Yes Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row mb-2">
        <div className="col-8">
        <Link  className="txt-primary pointer" to={`/edit/${this.props.listing.id}`}><p>{this.props.listing.title}</p></Link>
        </div>
        <div className="col-2">
        
          <a onClick={this.showModal}  ><i className="far fa-trash-alt"></i></a>
        </div>
        <div className="col-2">
       
          <Link  to={`/edit/${this.props.listing.id}`}> <i className="far fa-edit"></i></Link>
        </div>
      </div>
      </>
   );


  }
}

const mapStateToProps = (state, ownProp) => {
  const {listing} = ownProp;
  return {
      listing: state.listings.find(v => v.id == listing.id),
      isLoading: state.listingIsDeleting,
      hasErrored: state.listingDeletingErrored,
  };
};

const mapDispatchToprops = (dispatch)=>{

  return {
      deleteListing: (id)=>dispatch(deleteListing(id))
  };

};


export default connect(mapStateToProps , mapDispatchToprops)(ListTitle);