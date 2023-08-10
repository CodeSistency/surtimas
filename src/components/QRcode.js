import React from 'react'
import QRCode from 'react-qr-code'

function QRcode(props) {
  return (
    <div >
        <QRCode 
          size={130}
          // style={{ 
          // height: "auto", 
          // maxWidth: "100%", 
          // width: "100%" }}
          
          // viewBox={`0 0 256 256`}
          value={props.id} 
        />
    </div>
  )
}

export default QRcode