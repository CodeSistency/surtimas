import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, FormControl } from '@mui/material';
import ModalBuy from '../../pages/ModalBuy';
import ProductsModal from '../../pages/ProductsModal';
import CartContext from '../../context/CartProvider';
import useInput from '../../hooks/useInput';
import useToggle from '../../hooks/useToggle';

export default function PaymentForm({product, closeModal}) {

  const { cart, setCart } = React.useContext(CartContext);

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [check, toggleCheck] = useToggle('pago', true);
  const [pago, resetPago, pagoAttribs] = useInput('pago', '')

  console.log(product, product.length)
  return (
    <React.Fragment>
      
      <Grid container spacing={3}>
        {/* <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid> */}
        <Grid item xs={10} md={6}>
        {/* <Box sx={{ minWidth: 120 }}> */}
        
        {/* </Box> */}
        
          {/* <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          /> */}
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid> */}

        
      </Grid>
      <Typography variant="h6" gutterBottom>
        Producto
      </Typography>
      
        
        {product.cartProducts ?<ProductsModal product={product.cartProducts}/> :  <ModalBuy closeModal={closeModal} product={product}/>}
          {/* <ModalBuy closeModal={closeModal} product={product}/> */}
        
        
        <Grid item xs={12}>
          
        
        
      </Grid>
    </React.Fragment>
  );
}