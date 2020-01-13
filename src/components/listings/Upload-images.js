import React, {Component} from 'react';
import {uploadImages, deleteImage} from '../../redux/actions/listings'
import {connect} from 'react-redux';
import Images from './Images';

class UploadImages extends Component {


    constructor(props){

        super(props);
        this.state = {
            formValues: {
                images: ['']
            }, 
            dynamicFields:['file1']

        }

    }

    addFile = (e)=>{
        
        this.setState( (state) => {

            state.dynamicFields.push("");
            state.formValues.images.push("");

            return state;

        })

    }

    removeFile = (index)=>{

        this.setState((state)=> {
            state.dynamicFields.splice(index, 1);
            state.formValues.images.splice(index, 1);
             return state;

        })

    }

    handleChange(event, index) {

        const file = event.target.files[0]; // this was done because setState in asynchronous
         
        const reader = new FileReader();
 
        if(event.target.files && event.target.files.length) {
          const [file] = event.target.files;
          reader.readAsDataURL(file);
    
          
      
          reader.onload = () => {

            this.setState((state)=>{
                state.formValues.images.splice(index, 1, reader.result);
                console.log(state);
                return state;   

                        })
           
          };
        }


    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.uploadImages( {...this.state.formValues, id: this.props.listing.id});
        
        
    }

   


    render(){

        

        return(
            <>
                    <Images/>
                    <form onSubmit={this.handleSubmit}>
                    {this.state.dynamicFields.map((img, index) => (
                        <div>
                        <input name={img} type="file" onChange={(event)=>{

                            this.handleChange(event, index);

                            
                        }}/>
                        <div onClick={(index) => this.removeFile(index)} className="btn btn-danger">remove</div>
                        </div>
                    ) )}
                    <div onClick={this.addFile} className="btn btn-success">Add Image</div>
                    <button className="btn btn-success">Submit</button>
                    </form>
                    
                
                    
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
        uploadImages : (payload) => dispatch(uploadImages(payload)), 
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UploadImages);