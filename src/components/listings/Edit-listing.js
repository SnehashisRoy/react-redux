import React, {Component} from 'react';
import { Formik, Field, Form } from 'formik';
import {connect} from 'react-redux';
import {updateListing} from '../../redux/actions/listings';

// import * as Yup from 'yup';

// const ListingSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .required('Required'),
//   address: Yup.string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .required('Required'),
//   description: Yup.string()
//     .email('Invalid email')
//     .required('Required'),
// });




 class EditListing extends Component {

        
    render(){
        console.log(this);

        if (this.props.listingUpdateErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }
        if (this.props.listingIsUpdating) {
            return <p>Loading…</p>;
        }

        return (
            <>
            <h1>Update Listing</h1>
                <Formik
                initialValues={{
                    id : this.props.listing ? this.props.listing.id || '' : '', // used OR operator as to give an empty string instead of null
                    title : this.props.listing ? this.props.listing.title || '' : '',
                    address : this.props.listing ? this.props.listing.address || '' : '',
                    description : this.props.listing ? this.props.listing.description || '' : '',
                    bedroom : this.props.listing ? this.props.listing.bedroom || '' : '',
                    bathroom : this.props.listing ? this.props.listing.bathroom || '' : '',
                    furnished : this.props.listing ? this.props.listing.furnished || '' : '',
                    parking : this.props.listing ? this.props.listing.parking || '' : '',
                    pet_friendly : this.props.listing ? this.props.listing.pet_friendly || '' : '',
                    price : this.props.listing ? this.props.listing.price || '' : '',
                    size : this.props.listing ? this.props.listing.size || '' : '',
                    type : this.props.listing ? this.props.listing.type || '' : '',
                 }}
                //validationSchema={ListingSchema} 
                onSubmit = { 
                    (values, actions) =>{
                             this.props.updateListing(values);
                             actions.setSubmitting(false);
                    }
                }
                enableReinitialize= {true}
                render = {({ values, errors, status, touched, isSubmitting }) => (
                        <Form>
                            <Field type="text" name="title" />
                            {errors.title && touched.title && <div>{errors.title}</div>}
                            <Field type="text" name="address" />
                            {errors.address && touched.address && <div>{errors.address}</div>}
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
                            <label htmlFor="description">Description</label>
                            <Field component='textarea' type="text" name="description" rows="5" id="description"/>
                            {errors.description && touched.description && <div>{errors.description}</div>}
                            <Field type="text" name="price" />
                            {errors.price && touched.price && <div>{errors.price}</div>}
                            <Field type="text" name="size" />
                            {errors.size && touched.size && <div>{errors.price}</div>}

                            <Field type='checkbox' name='furnished'/>
                            <Field type='checkbox' name='pet_friendly'/>
                                


                            <Field type='text' component="select" name="type">
                                <option value="main floor">Main Floor</option>
                                <option value="basement">Basment</option>
                                <option value="full house">Full House</option>
                            </Field>
                            {errors.type && touched.type && <div>{errors.type}</div>}

                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    )}
                />
            </>
            
        )
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