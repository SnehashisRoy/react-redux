import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import {connect} from 'react-redux';
import {updateListing, createListing} from '../../redux/actions/listings';

import * as Yup from 'yup';

const ListingSchema1 = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long! Maximum 100 Characters.')
    .required('Required'),
  address: Yup.string()
    .min(5, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .required('Required'),
});

const ListingSchema2 = Yup.object().shape({
      bedroom: Yup.string()
      .required('Required'),
      bathroom: Yup.string()
      .required('Required'),
      price: Yup.string()
      .required('Required'),
      size: Yup.string()
      .required('Required'),
    
  });

class EditListing extends Component {

    steps=2;

    constructor(props){
        super(props);
        this.state = {
            step: 1,
            formValues: this.props.listing
        }

    }

    nextStep(values){
        
        this.setState((state)=>{

            state.step += 1;
            state.formValues = {...state.formValues, ...values}


            if(state.step == this.steps+1){
                if(this.props.listing.id){
                    this.props.updateListing(state.formValues);
                }else{
                    this.props.createListing(state.formValues);
                }
               
            }

            return state;

        })
    }

    prevStep = ()=>{
        this.setState((state)=>{
            state.step-=1;
            return state;
        })
    }

        
    render(){

        console.log(this.state.formValues);

        const formValues = this.state.formValues;
        

        if (this.props.listingUpdateErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }
        if (this.props.listingIsUpdating) {
            return <p>Loading…</p>;
        }

        switch(this.state.step){

            case 1:
                    return (
                        <>
                        <div className="jumbotron text-center">
                            <strong>Listing:</strong> {formValues.title || 'Create a new listing'}
                        </div>
                            <Formik
                            initialValues={{
                                id : formValues.id || '',
                                title : formValues.title || '',
                                address : formValues.address || '',
                                description : formValues.description || '',
                             }}
                            validationSchema={ListingSchema1} 
                            onSubmit = { 
                                (values, actions) =>{

                                        this.nextStep(values);

                                        actions.setSubmitting(false);
                                }
                            }
                            enableReinitialize= {true}
                            render = {({ values, errors, status, touched, isSubmitting, validateForm }) => (
                                <div className="container">
                                    
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-6">
                                            <Form>
                                                <label htmlFor="title" className="font-weight-bold">Title</label>
                                                <Field type="text" name="title" className="form-control" id="title"  />
                                                {errors.title && touched.title && <div className="alert alert-danger">{errors.title}</div>}
                                                <label htmlFor="address"className="font-weight-bold">Address</label>
                                                <Field type="text" name="address" className="form-control" id="address"/>
                                                {errors.address && touched.address && <div className="alert alert-danger">{errors.address}</div>}
                                                <label htmlFor="description" className="font-weight-bold">Description</label>
                                                <Field component='textarea' type="text" name="description" rows="5" id="description" className="form-control"/>
                                                {errors.description && touched.description && <div className="alert alert-danger">{errors.description}</div>}
                                                <div className="text-right pt-5">
                                                    <button type="submit" disabled={isSubmitting} className="btn btn-success">
                                                        Next
                                                    </button>
                                                </div>
                                            </Form>
                                      </div>
                                    </div>
                                </div>
                                )}
                            />
                        </>
                        
                    )
            case 2:
                    return (
                        <>
                            <div className="jumbotron text-center">
                                <strong>Listing:</strong> {formValues.title}
                            </div>
                            <Formik
                            initialValues={{
                                bedroom : formValues.bedroom || '',
                                bathroom : formValues.bathroom || '' ,
                                furnished : formValues.furnished || '' ,
                                parking : formValues.furnished || '',
                                pet_friendly : formValues.pet_friendly || '',
                                price : formValues.price || '',
                                size : formValues.size || '',
                                type : formValues.type || ''
                             }}
                           validationSchema={ListingSchema2} 
                            onSubmit = { 
                                (values, actions) =>{

                                        this.nextStep(values);
                                        //  this.props.updateListing(values);
                                        actions.setSubmitting(false);
                                        
                                }
                            }
                            enableReinitialize= {true}
                            render = {({ values, errors, status, touched, isSubmitting, validateForm }) => (
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-6">
                                       
                                            <Form>
                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <label htmlFor="bedroom" className="font-weight-bold"> Bedroom</label>
                                                        
                                                        <Field type='text' component="select" name="bedroom" className="form-control" id="bedroom">
                                                            <option value="">Select an option</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                        </Field>
                                                        {errors.bedroom && touched.bedroom && <div className="alert alert-danger">{errors.bedroom}</div>}
                                                    </div>

                                                    <div className="col">
                                                        <label htmlFor="bathroom" className="font-weight-bold">bathroom</label>
                                                        <Field type='text' component="select" name="bathroom" className="form-control">
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        </Field>
                                                        {errors.bathroom && touched.bathroom && <div className="alert alert-danger">{errors.bathroom}</div>}
                                                    </div>
                                                </div>

                                                <div className="row mt-3">
                                                    <div className="col">
                                                    <label htmlFor="price" className="font-weight-bold">Price</label>
                                                    <Field type="text" value={values.price || ''} name="price" className="form-control" />
                                                    {errors.price && touched.price && <div className="alert alert-danger">{errors.price}</div>}

                                                    </div>
                                                    <div className="col">
                                                    <label htmlFor="size" className="font-weight-bold">Size</label>
                                                    <Field type="text" value={values.size || ''} name="size" className="form-control" />
                                                    {errors.size && touched.size && <div className="alert alert-danger">{errors.size}</div>}
                                                    </div>
                                                </div>

                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <Field type='checkbox' name='furnished'/>
                                                        <label htmlFor="furnished" className="font-weight-bold ml-2">Furnished</label>

                                                    </div>
                                                    <div className="col">
                                                        <Field type='checkbox' name='pet_friendly'/>
                                                        <label htmlFor="pet_friendly" className="font-weight-bold ml-2">Pet Friendly</label>
                                                    </div>
                                                </div>

                                                <div className="row justify-content-center mt-3">
                                                    <div className="col-8">
                                                    <label htmlFor="type" className="font-weight-bold ml-2">Unit Type</label>
                                                    <Field type='text' component="select" name="type" className="form-control">
                                                        <option value="main floor">Main Floor</option>
                                                        <option value="basement">Basment</option>
                                                        <option value="full house">Full House</option>
                                                        <option value="roo mate">Room Mate</option>
                                                    </Field>
                                                    {errors.type && touched.type && <div>{errors.type}</div>}

                                                    </div>

                                                </div>

                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <div onClick={this.prevStep} className="btn btn-success">
                                                            Previous
                                                        </div>

                                                    </div>
                                                    <div className="col">
                                                        <button type="submit" disabled={isSubmitting} className="btn btn-success" style={{float: 'right'}}>
                                                            Submit
                                                        </button>

                                                    </div>
                                                </div>
                                            
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                                )}
                            />
                        </>
                        
                    )
            case 3:
                if(!this.props.listingBeingUpdated){
                    return(
                        <div>loading...</div>
                    )
                }
                return(
                    <Redirect to={`/upload-images/`}/>
                )
            default:
                return null;
        }

        
    }
}


const mapStateToProps = (state, ownProps) => {

    const {listings, listingUpdateErrored, listingIsUpdating,listingCreateErrored, listingIsCreating, listingBeingUpdated} = state;
    const {match} = ownProps;

    let listing;

    if(match.params.id == 'create'){
        listing = {
            id : null,
            title: 'Please write a concise and catchy title of your Ad'
        }
    }else{
       listing =  listings.find(val => val.id == match.params.id );
    }
    return {

        listing: listing,
        listingUpdateErrored: listingUpdateErrored,
        listingIsUpdating: listingIsUpdating,
        listingCreateErrored: listingCreateErrored,
        listingIsCreating: listingIsCreating,
        listingBeingUpdated: listingBeingUpdated
    }
}
const mapDispatchToProps = (dispatch)=> {
    return {
        updateListing : (payload) =>  dispatch(updateListing(payload)),
        createListing : (payload) => dispatch(createListing(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps )(EditListing);
