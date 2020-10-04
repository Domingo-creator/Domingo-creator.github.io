import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import Photo from './Photo';
import NoPhotos from './NoPhotos';
import PhotoFocus from './PhotoFocus';

class PhotoList extends Component {
    
    state = {
        photoFocusIndex: 0,
        focusImgVisable: false,
    }
    
    componentDidUpdate = () => {
        if (this.props.searchText !== decodeURI(window.location.pathname.replace(/[^\w%\s]/gi, '')).replace("search", '')) {
            this.props.search();
        }
    }
   
    updateFocusImg = (focusImgIndex) => {
        this.setState({
            photoFocusIndex: focusImgIndex,
            focusImgVisable: true,
        });
    }

    // updateFocusImg = (focusImgURL) => {
    //     this.setState({
    //         focusImgURL: focusImgURL.replace(/m.jpg/gi, 'c.jpg'),
    //         focusImgVisable: true,
    //     });        
    // }

    photoFocusClose = () => {
        this.setState({
            focusImgVisable: false,
        });
    }


    photoFocusPrev = () => {
        this.setState({
            photoFocusIndex: this.state.photoFocusIndex - 1 === -1 ? this.props.data.photo.length - 1 : this.state.photoFocusIndex - 1,
        })
    }
    
    photoFocusNext = () => {
        this.setState({
            photoFocusIndex: this.state.photoFocusIndex + 1 === this.props.data.photo.length ? 0 : this.state.photoFocusIndex + 1,
        })
    }
    render() {
        const results = this.props.data; 
        let photos;
        let focusImg = "";
        if (results.photo.length > 0) {
            photos = results.photo.map( (photo, index) => 
                <Photo url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`} key={photo.id} updateFocusImg={this.updateFocusImg} photoFocusIndex={index}/>
            );
        } else {
            photos = <NoPhotos />
        }

        if (this.state.focusImgVisable) {
            //focusImg = <PhotoFocus url={this.state.focusImgURL} photoFocusClose={this.photoFocusClose}/>
            focusImg = <PhotoFocus photoFocusNext={this.photoFocusNext} photoFocusPrev={this.photoFocusPrev} photoFocusClose={this.photoFocusClose} results={this.props.data.photo} photoFocusIndex={this.state.photoFocusIndex}/>
        } 

        return (
            <div className="main-content">
                {focusImg}
                <h2 className="query-header">Images of: {this.props.searchText}</h2>
                <ul className="photo-list">
                    {photos}
                </ul>
            </div>
        )
    }
};

export default withRouter(PhotoList);
