import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import {connect} from 'react-redux';
import {updateListing} from '../../redux/actions/listings';

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
                this.props.updateListing(state.formValues);
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
                            <Formik
                            initialValues={{
                                id : formValues.id,
                                title : formValues.title,
                                address : formValues.address,
                                description : formValues.description,
                             }}
                            validationSchema={ListingSchema} 
                            onSubmit = { 
                                (values, actions) =>{

                                        this.nextStep(values);

                                        console.log(this.state);
                                        //  this.props.updateListing(values);
                                        actions.setSubmitting(false);
                                }
                            }
                            enableReinitialize= {true}
                            render = {({ values, errors, status, touched, isSubmitting, validateForm }) => (
                                    <Form>
                                        <Field type="text" name="title" />
                                        {errors.title && touched.title && <div>{errors.title}</div>}
                                        <Field type="text" name="address" />
                                        {errors.address && touched.address && <div>{errors.address}</div>}
                                        <label htmlFor="description">Description</label>
                                        <Field component='textarea' type="text" name="description" rows="5" id="description"/>
                                        {errors.description && touched.description && <div>{errors.description}</div>}
                                        
                                        <button type="submit" disabled={isSubmitting}>
                                            Submit
                                        </button>
                                    </Form>
                                )}
                            />
                        </>
                        
                    )
            case 2:
                    return (
                        <>
                            <Formik
                            initialValues={{
                                bedroom : formValues.bedroom,
                                bathroom : formValues.bathroom ,
                                furnished : formValues.furnished ,
                                parking : formValues.furnished,
                                pet_friendly : formValues.pet_friendly,
                                price : formValues.price,
                                size : formValues.size,
                                type : formValues.type
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
                                    <Form>
                                        
                                        <Field type='text' component="select" name="bedroom">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </Field>
                                        <Field type='text' component="select" name="bathroom">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </Field>
                                        
                                        <Field type="text" value={values.price || ''} name="price" />
                                        {errors.price && touched.price && <div>{errors.price}</div>}
                                        <Field type="text" value={values.price || ''} name="size" />
                                        {errors.size && touched.size && <div>{errors.price}</div>}
            
                                        <Field type='checkbox' name='furnished'/>
                                        <Field type='checkbox' name='pet_friendly'/>
                                        <Field type='text' component="select" name="type">
                                            <option value="main floor">Main Floor</option>
                                            <option value="basement">Basment</option>
                                            <option value="full house">Full House</option>
                                        </Field>
                                        {errors.type && touched.type && <div>{errors.type}</div>}
                                        <div onClick={this.prevStep}>
                                            Previous
                                        </div>
            
                                        <button type="submit" disabled={isSubmitting}>
                                            Submit
                                        </button>
                                    </Form>
                                )}
                            />
                        </>
                        
                    )
            case 3:
                return(
                    <Redirect to='/'/>
                )
            default:
                return null;
        }

        
    }
}


const mapStateToProps = (state, ownProps) => {

    const {listings, listingUpdateErrored, listingIsUpdating} = state;
    const {match} = ownProps;
    return {

        listing: listings.find(val => val.id == match.params.id ),
        listingUpdateErrored: listingUpdateErrored,
        listingIsUpdating: listingIsUpdating
    }
}
const mapDispatchToProps = (dispatch)=> {
    return {
        updateListing : (payload) =>  dispatch(updateListing(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps )(EditListing);
