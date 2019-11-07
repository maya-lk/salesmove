import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt , faTrash } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import API from '../../lib/api';

import { deleteAdItem } from '../../redux/user/user.actions';

import './my-ad-item.styles.scss';

const MyAdItem = ({ item , history }) => {

    const handalDelete = itemID => {

        const formData = new FormData();
        formData.append('pid',itemID);

        API.post("delete-ad", formData , {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('response' , response.data);
        }).catch(err => {
            console.log('err' , err);
        });
    }
    
    return(
        <div className="myPostItem">
            <div className="imageWrap" style={{ backgroundImage : `url(${(item.images.length)? item.images[0] : ''})` }}></div>
            <div className="content">
                <h4>{item.title}</h4>
                {item.specifications}
            </div>
            <div className="actionWrap">
                <span className="btn btn-success" onClick={() => history.push(`/edit-ad/${item.ID}`)}><FontAwesomeIcon icon={faPencilAlt} /> Edit</span>
                <span className="btn btn-danger" onClick={() => handalDelete(item.ID)}><FontAwesomeIcon icon={faTrash} /> Delete</span>
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    deleteAdItem : (itemID) => dispatch(deleteAdItem(itemID))
})

export default withRouter(connect(null,mapDispatchToProps)(MyAdItem));