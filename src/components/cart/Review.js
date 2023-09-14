import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import CartContext from '../../context/CartProvider';
import useInput from '../../hooks/useInput';
import ModalBuy from '../../pages/ModalBuy';

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];



export default function Review({cart, product}) {

  const {  buyProduct } = React.useContext(CartContext);
  console.log(cart, product, buyProduct)

  const [nombre, resetNombre, nombreAttribs] = useInput('nombre', '')
const [apellido, resetApellido, apellidoAttribs] = useInput('apellido', '')
const [direccion, resetDireccion, direccionAttribs] = useInput('direccion', '')
const [direccionOpcional, resetDireccionOpcional, direccionOpcionalAttribs] = useInput('direccionOpcional', '')
const [ciudad, resetCiudad, ciudadAttribs] = useInput('ciudad', '')
const [estado, resetEstado, estadoAttribs] = useInput('estado', '')
const [pago, resetPago, pagoAttribs] = useInput('pago', '')
  const [total, setTotal] = React.useState(0)

  const { addProductToResults, removeFromCart, handleCart } = React.useContext(CartContext);

  const calculateTotalRevenue = () => {
    let totalRevenue = 0;
    product?.cartProducts?.forEach((product) => {
      Object.values(product.tallas).forEach((colors) => {
        colors.forEach((color) => {
          const deseo = parseInt(color.deseo, 10) || 0;
          const precio = parseInt(product.precio, 10) || 0;
          totalRevenue += deseo * precio;
        });
      });
    });
    // console.log(totalRevenue)
    setTotal(totalRevenue)
    return totalRevenue;
    // setTotal(totalRevenue)
  };

  const calculateTotalRevenue2 = () => {
    let totalRevenue = 0;
    
      Object.values(product.tallas).forEach((colors) => {
        colors.forEach((color) => {
          const deseo = parseInt(color.deseo, 10) || 0;
          const precio = parseInt(product.precio, 10) || 0;
          totalRevenue += deseo * precio;
        });
      });
  
    // console.log(totalRevenue)
    setTotal(totalRevenue)
    return totalRevenue;
    // setTotal(totalRevenue)
  };

  // const calculateTotalRevenue = () => {
  //   let totalRevenue = 0;
  //   let useReducer = true;
  
  //   product?.cartProducts?.forEach((product) => {
  //     Object.values(product.tallas).forEach((colors) => {
  //       colors.forEach((color) => {
  //         const deseo = parseInt(color.deseo, 10) || 0;
  //         if (deseo !== 0) {
  //           useReducer = false; // If any deseo is non-zero, disable the reducer
  //         }
  //         const precio = parseInt(product.precio, 10) || 0;
  //         totalRevenue += deseo * precio;
  //         console.log(totalRevenue)
  //         setTotal(totalRevenue);
  //       });
  //     });
  //   });
  
  //     totalRevenue = products?.cartProducts?.reduce(
  //       (totalSum, sum) => totalSum = totalSum + sum.precio, 0).toFixed(2)
  //     console.log(totalRevenue)
  //    if (useReducer) {
  //    setTotal(totalRevenue);
  //   }
  
  //   setTotal(totalRevenue);
  //   return totalRevenue;
  // };

  React.useEffect(() => {
    calculateTotalRevenue()
    calculateTotalRevenue2()
  }, [product])
  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Agregar al carrito
      </Typography>
      {product.cartProducts ?
      <List disablePadding>
        {product?.cartProducts?.map((product) => (
          <ListItem key={product.nombre} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.nombre} secondary={product.codigo} />
            <Typography variant="body2">{product.precio}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {total == 0? 'No cantidades' : total}
          </Typography>
        </ListItem>
      </List> 
      
      :

      <List disablePadding>
      
        <ListItem key={product.titulo} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={product.titulo} secondary={product.codigo} />
          <Typography variant="body2">{product.precio}</Typography>
        </ListItem>
      
      <ListItem sx={{ py: 1, px: 0 }}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        {total == 0? 'No cantidades' : total}
        </Typography>
      </ListItem>
    </List>
    }
    {/* <ModalBuy product={product}/> */}
      
    </React.Fragment>
  );
}