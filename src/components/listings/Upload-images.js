import React, {Component} from 'react';
import {connect} from 'react-redux';

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

    addFile = ()=>{
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

        this.setState((state)=>{
                    
                    state.formValues.images.splice(index, 1, file.name);
                    console.log(state);
                    return state;

                            })

    }

   


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
                                    <img src={image.image_url} className="img-fluid" />
                                </div>
                            )
                        })}
                    </div>
                    <form>
                    {this.state.dynamicFields.map((img, index) => (
                        <div>
                        <input name={img} type="file" onChange={(event)=>{

                            this.handleChange(event, index);

                            
                        }}/>
                        <div onClick={(index) => this.removeFile(index)} className="btn btn-danger">remove</div>
                        </div>
                    ) )}
                    </form>
                    <div onClick={this.addFile} className="btn btn-success">Add Image</div>
                    </div>

                
                
                    
            </>

        )
    }

}

const mapStateToProps = (state, ownProps)=>{

    const {listings} = state;
    const {match} = ownProps;


    return {
        listing : listings.find( v =>  v.id == match.params.id)
    }
}


export default connect(mapStateToProps)(UploadImages);