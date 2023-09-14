import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import useInput from '../../hooks/useInput';
import useToggle from '../../hooks/useToggle';


export default function AddressForm() {

  // const [nombre, setNombre] = React.useState()
  // const [apellido, setApellido] = React.useState()
  // const [direccion, setDireccion] = React.useState()
  // const [direccionOpcional, setDireccionOpcional] = React.useState()
  // const [ciudad, setCiudad] = React.useState()
  // const [estado, setEstado] = React.useState()

  const [check, toggleCheck] = useToggle('info', true);
  const [nombre, resetNombre, nombreAttribs] = useInput('nombre', '')
  const [apellido, resetApellido, apellidoAttribs] = useInput('apellido', '')
  const [direccion, resetDireccion, direccionAttribs] = useInput('direccion', '')
  const [direccionOpcional, resetDireccionOpcional, direccionOpcionalAttribs] = useInput('direccionOpcional', '')
  const [ciudad, resetCiudad, ciudadAttribs] = useInput('ciudad', '')
  const [estado, resetEstado, estadoAttribs] = useInput('estado', '')

  // function handleNombre(e) {
  //   setNombre(e.target.value)
  //   console.log(nombre)
  // }

  // function handleApellido(e) {
  //   setApellido(e.target.value)
  //   console.log(apellido)
  // }
  // function handleDireccion(e) {
  //   setDireccion(e.target.value)
  //   console.log(direccion)
  // }
  // function handleDireccionOpcional(e) {
  //   setDireccionOpcional(e.target.value)
  //   console.log(direccionOpcional)
  // }
  // function handleCiudad(e) {
  //   setCiudad(e.target.value)
  //   console.log(ciudad)
  // }
  // function handleEstado(e) {
  //   setEstado(e.target.value)
  //   console.log(estado)
  // }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Envio del Pedido
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Nombre"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            {...nombreAttribs}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Apellido"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            {...apellidoAttribs}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Direccion 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            // onChange={handleDireccion}
            {...direccionAttribs}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Direccion 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            {...direccionOpcionalAttribs}
            // onChange={handleDireccionOpcional}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Ciudad"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            {...ciudadAttribs}
            // onChange={handleCiudad}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="Estado/Region"
            fullWidth
            variant="standard"
            {...estadoAttribs}
            // onChange={handleEstado}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid> */}
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Recordar esta direccion"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}