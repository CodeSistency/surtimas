import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import CartContext from '../../context/CartProvider';
import { useContext } from 'react';
import ReactWhatsapp from 'react-whatsapp';
import useInput from '../../hooks/useInput';
import CustomizedAccordions from './Accordion';
import useAuth from '../../hooks/useAuth';

function Copyright({closeModal}) {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {/* {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Surtymas
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'} */}

      <Button fullWidth variant="outlined" onClick={closeModal}>Cerrar</Button>
    </Typography>
  );
}

const steps = ['Agregar piezas', 'Agregar al carro'];

function getStepContent(step, closeModal, product, cart) {
  switch (step) {
    case 0:
      return <PaymentForm closeModal={closeModal} product={product} />;
    case 1:
      return <Review cart={cart} product={product}/>; 
    default:
      throw new Error('Unknown step');
  }
}

export default function CartCheckout({closeModal, product, cart}) {

  // const { cart, setCart } = useContext(CartContext);
  const {  addProductToResults, removeFromCart, handleCart } = useContext(CartContext);
  const {auth} = useAuth()
  console.log(cart)
  const [nombre, resetNombre, nombreAttribs] = useInput('nombre', '')
const [apellido, resetApellido, apellidoAttribs] = useInput('apellido', '')
const [direccion, resetDireccion, direccionAttribs] = useInput('direccion', '')
const [direccionOpcional, resetDireccionOpcional, direccionOpcionalAttribs] = useInput('direccionOpcional', '')
const [ciudad, resetCiudad, ciudadAttribs] = useInput('ciudad', '')
const [estado, resetEstado, estadoAttribs] = useInput('estado', '')
const [pago, resetPago, pagoAttribs] = useInput('pago', '')

  const [activeStep, setActiveStep] = React.useState(0);
  const [selected, setSelected] = React.useState([product])

  const handleNext = () => {
    setActiveStep(activeStep + 1);

    if(activeStep === steps.length - 1){
      console.log('active')
      const selected = [product]
      if(product.cartProducts){
        console.log(product)
        return (
          <ReactWhatsapp 
          
                            // className='modal-button'
                            // style={{borderRadius: '10px', backgroundColor:'rgb(5, 248, 78)', border: '1px solid rgb(5, 248, 78)'}} 
                            number='+58 4124668486'
                            message={`¡Hola! 👋 ¡Bienvenido a Surtymas! 
Mi nombre es: ${nombre} ${apellido}
Mi compra es la siguiente:
                            
${product?.cartProducts.map((product) => {
                              let message = `"${product.nombre}". Precio: $${product.precio}, Precio al mayor: $${product.precio_mayor}, Codigo: ${product.codigo}`;
                              if (product.tallas) {
                                const tallasMessage = Object.entries(product.tallas)
                                  .map(([size, colors]) => {
                                    const deseos = colors.filter((color) => color.deseo !== 0);
                                    if (deseos.length > 0) {
                                      const deseosMessage = deseos
                                        .map((color) => `${size}: ${color.deseo}`)
                                        // .join(", ");
                                      return deseosMessage;
                                    }
                                    return null;
                                  })
                                  .filter((message) => message !== null)
                                  .join("\n");
                                if (tallasMessage !== "") {
                                  message += `\nTallas: \n${tallasMessage} piezas\n`;
                                }
                              }
                              return message;
                            })}
Nuestro equipo te atenderá pronto. ¡Gracias! 🛍️`}

                            >Comprar</ReactWhatsapp> 
        )
      }else{
        console.log(product)
        return(
          <ReactWhatsapp
          
                            className='modal-button'
                            style={{borderRadius: '10px', backgroundColor:'rgb(5, 248, 78)', border: '1px solid rgb(5, 248, 78)'}} 
                            number='+58 4124668486'
                            message={`¡Hola! 👋 ¡Bienvenido a Surtymas! 
Mi nombre es: ${nombre} ${apellido}
Mi compra es la siguiente:

                      ${selected.map((product) => {
                              let message = `"${product.nombre}". Precio: $${product.precio}, Precio al mayor: $${product.precio_mayor}, Codigo: ${product.codigo}`;
                              if (product.tallas) {
                                const tallasMessage = Object.entries(product.tallas)
                                  .map(([size, colors]) => {
                                    const deseos = colors.filter((color) => color.deseo !== 0);
                                    if (deseos.length > 0) {
                                      const deseosMessage = deseos
                                        .map((color) => `${size}: ${color.deseo}`)
                                        // .join(", ");
                                      return deseosMessage;
                                    }
                                    return null;
                                  })
                                  .filter((message) => message !== null)
                                  .join("\n");
                                if (tallasMessage !== "") {
                                  message += `\nTallas: \n${tallasMessage} piezas\n`;
                                }
                              }
                              return message;
                            })}
Nuestro equipo te atenderá pronto. ¡Gracias! 🛍️`}

                            >Comprar</ReactWhatsapp> 
        )
      }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Surtymas
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Carrito
          </Typography>
          <Stepper activeStep={activeStep}  sx={{ pt: 3, pb: 5, gap: {xs: 1}, alignItems: {xs: 'center'}, justifyContent: {xs: 'center',}, flexDirection: {
      lg: 'column', md: 'column', xl: 'column', xs: 'column', sm: 'column',  // Apply column direction in mobile
    }, }}>
            {steps.map((label) => (
              <Step sx={{width: {xs: '100%'} }} key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/* <CustomizedAccordions/> */}
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Gracias por su pedido.
              </Typography>
              <Typography variant="subtitle1">
                Su orden sera atendida en breves.
              </Typography>
              <Button variant="contained" onClick={handleBack} sx={{ mt: 3, ml: 1,  }}>
                    Cerrar
                  </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, closeModal, product, cart)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Regresar
                  </Button>
                )}

{activeStep === steps.length - 1 && product.cartProducts 
                ? <ReactWhatsapp 
          
                className='modal-button'
                style={{borderRadius: '3px', width: '50%', backgroundColor:'rgb(5, 248, 78)', marginLeft: '3px', border: '1px solid rgb(5, 248, 78)'}} 
                number='+58 4124668486'
                message={`¡Hola! 👋 ¡Bienvenido a Surtymas! 
Mi nombre es: ${nombre} ${apellido}
Mi compra es la siguiente:
                
${product?.cartProducts.map((product) => {
                  let message = `"${product.nombre}". Precio: $${product.precio}, Precio al mayor: $${product.precio_mayor}, Codigo: ${product.codigo}`;
                  if (product.tallas) {
                    const tallasMessage = Object.entries(product.tallas)
                      .map(([size, colors]) => {
                        const deseos = colors.filter((color) => color.deseo !== 0);
                        if (deseos.length > 0) {
                          const deseosMessage = deseos
                            .map((color) => `${size}: ${color.deseo}`)
                            // .join(", ");
                          return deseosMessage;
                        }
                        return null;
                      })
                      .filter((message) => message !== null)
                      .join("\n");
                    if (tallasMessage !== "") {
                      message += `\nTallas: \n${tallasMessage} piezas\n`;
                    }
                  }
                  return message;
                })}
Nuestro equipo te atenderá pronto. ¡Gracias! 🛍️`}

                >Comprar</ReactWhatsapp> 
                : activeStep === steps.length - 1 && product
                ? <Button sx={{ mt: 3, ml: 1 }} variant="contained" onClick={() => handleCart(auth?.user, product.titulo, product.precio, product.precio_mayor, product.img, product._id, product.codigo, product.tallas, product.tallas_zapatos)}>Agregar</Button> 
              : null}

                {activeStep === steps.length - 1 ? null :
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Siguiente
                </Button>}
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright closeModal={closeModal}/>
      </Container>
    </React.Fragment>
  );
}