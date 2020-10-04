import React from 'react';


const PhotoFocus = props => (

    <div className = "photo-focus-wrap">
        <button className="photo-focus-close" onClick={() => props.photoFocusClose() }>X</button>
        <button className="photo-focus-prev"  onClick={() => props.photoFocusPrev()  }>&lt;</button>
        <img src ={`https://farm${props.results[props.photoFocusIndex].farm}.staticflickr.com/${props.results[props.photoFocusIndex].server}/${props.results[props.photoFocusIndex].id}_${props.results[props.photoFocusIndex].secret}_c.jpg`} alt="" />
        <button className="photo-focus-next"  onClick={() => props.photoFocusNext()  }>&gt;</button>
    </div>
);

export default PhotoFocus;