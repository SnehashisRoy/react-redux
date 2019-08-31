import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import {connect} from 'react-redux';
import {updateListing, createListing} from '../../redux/actions/listings';

import * as Yup from 'yup';

const ListingSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  address: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
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
                            validationSchema={ListingSchema} 
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
                                                <label htmlFor="title">Title</label>
                                                <Field type="text" name="title" className="form-control" id="title"  />
                                                {errors.title && touched.title && <div>{errors.title}</div>}
                                                <label htmlFor="address">Address</label>
                                                <Field type="text" name="address" className="form-control" id="address"/>
                                                {errors.address && touched.address && <div>{errors.address}</div>}
                                                <label htmlFor="description">Description</label>
                                                <Field component='textarea' type="text" name="description" rows="5" id="description" className="form-control"/>
                                                {errors.description && touched.description && <div>{errors.description}</div>}
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
                           // validationSchema={ListingSchema} 
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
                                                        <label htmlFor="bedroom" >Bedroom</label>
                                                        
                                                        <Field type='text' component="select" name="bedroom" className="form-control" id="bedroom">
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                        </Field>
                                                    </div>

                                                    <div className="col">
                                                        <label htmlFor="bedroom" >Bedroom</label>
                                                        <Field type='text' component="select" name="bathroom" className="form-control">
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        </Field>
                                                    </div>
                                                </div>

                                                <div className="row mt-3">
                                                    <div className="col">
                                                    <Field type="text" value={values.price || ''} name="price" className="form-control" />
                                                    {errors.price && touched.price && <div>{errors.price}</div>}

                                                    </div>
                                                    <div className="col">
                                                    <Field type="text" value={values.price || ''} name="size" className="form-control" />
                                                    {errors.size && touched.size && <div>{errors.price}</div>}

                                                    </div>
                                                </div>

                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <Field type='checkbox' name='furnished'/>

                                                    </div>
                                                    <div className="col">
                                                        <Field type='checkbox' name='pet_friendly'/>
                                                    </div>
                                                </div>

                                                <div className="row justify-content-center mt-3">
                                                    <div className="col-8">
                                                    <Field type='text' component="select" name="type">
                                                        <option value="main floor">Main Floor</option>
                                                        <option value="basement">Basment</option>
                                                        <option value="full house">Full House</option>
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
                return(
                    <Redirect to={`/upload-images/${formValues.id}`}/>
                )
            default:
                return null;
        }

        
    }
}


const mapStateToProps = (state, ownProps) => {

    const {listings, listingUpdateErrored, listingIsUpdating,listingCreateErrored, listingIsCreating} = state;
    const {match} = ownProps;

    let listing;

    if(match.params.id == 'create'){
        listing = {
            id : null,
            title: 'New listing'
        }
    }else{
       listing =  listings.find(val => val.id == match.params.id );
    }
    return {

        listing: listing,
        listingUpdateErrored: listingUpdateErrored,
        listingIsUpdating: listingIsUpdating,
        listingCreateErrored: listingCreateErrored,
        listingIsCreating: listingIsCreating
    }
}
const mapDispatchToProps = (dispatch)=> {
    return {
        updateListing : (payload) =>  dispatch(updateListing(payload)),
        createListing : (payload) => dispatch(createListing(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps )(EditListing);
