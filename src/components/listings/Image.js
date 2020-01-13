import React, {Component} from 'react';
import {deleteImage} from '../../redux/actions/listings'
import {connect} from 'react-redux';

class Images extends Component {

    constructor(props){

        super(props);
        
    }

    deleteImage = (event) => {
        event.stopPropagation();
        this.props.deleteImage(this.props.image.id);

    }

    render(){

        return(
            <>
                <span><i className="fas fa-minus-circle" onClick={this.deleteImage}></i></span> <img src={ 'http://localhost:8085' + this.props.image.image_url} className="img-fluid" />
                    
            </>

        )
    }

}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteImage : (id) => dispatch(deleteImage(id))
    }
}


export default connect(null, mapDispatchToProps)(Images);