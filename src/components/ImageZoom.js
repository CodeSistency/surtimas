// import React from 'react';
// import PinchZoom from 'react-pinch-zoom';

// const ImageZoom = ({src}) => {
// //   const imageSrc = '/path/to/image.jpg';

//   return (
//     <div style={{ width: '100%', height: '100vh' }}>
//       <PinchZoom>
//         <img src={src} alt="Image" />
//       </PinchZoom>
//     </div>
//   );
// };

// export default ImageZoom

import React, { Component } from "react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ImageZoom = ({src}) => {
  return (
    <div >

    
    <TransformWrapper
    
      initialScale={1}
      initialPositionX={0}
      initialPositionY={0}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          {/* <div className="tools">
            <button onClick={() => zoomIn()}>+</button>
            <button onClick={() => zoomOut()}>-</button>
            <button onClick={() => resetTransform()}>x</button>
          </div> */}
          <TransformComponent >
            <img className="image-detail"  src={src} alt="test" />
            
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
    </div>
  );
};

export default ImageZoom