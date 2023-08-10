import React, {useState, useRef} from 'react'
import Barcode from "react-barcode"
import ReactToPrint from "react-to-print"

const pageStyle =`
@page {
    size: 30mm 20mm
};
    
@media all {
    .pageBreak {
        display: none
    }
};

@media print{
    .pageBreak {
        page-break-before: always;
    }

}

`

function BarCodeGen(props) {

    const [value, setValue] = useState("")
    const ref = useRef()

    // function generateBarcode(e) {
    //     setValue(e.target.value)
    // }

  return (
    <div>
        <div>
            <Barcode width={1} ref={ref} height={180} value={props.id}/>
        </div>
        {/* <form>
            <input type='text' onChange={e => setValue(e.target.value)} placeholder='barcode'/>
        </form>
        <button>Generate Barcode</button>
        <ReactToPrint 
            trigger={() => <button>Print</button>}
            content={() => ref.current}
            pageStyle={pageStyle}
        /> */}
    </div>
  )
}

export default BarCodeGen