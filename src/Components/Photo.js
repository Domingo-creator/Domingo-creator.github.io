import React from 'react';


const Photo = props => (
    <li className = "photo-wrap">
        <img src ={props.url} alt="" onClick={() => props.updateFocusImg(props.photoFocusIndex)} />
    </li>
);

export default Photo;