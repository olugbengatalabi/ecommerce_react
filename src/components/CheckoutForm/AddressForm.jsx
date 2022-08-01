import React, {useState, useEffect} from 'react';
import { InputLabel, Select, MenuItem, Grid, Typography, Button } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './FormInput';
import { commerce } from '../../lib/commerce' 
import { Link } from 'react-router-dom';

const AddressForm = ({ checkoutToken, next} ) => {
  // console.log(checkoutToken);
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const methods = useForm()
  
  const countries = Object.entries(shippingCountries).map(([code,name]) => ({id:code, label:name}))
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }))
  const options = shippingOptions.map((so) => ({ id: so.id, label: `${so.description} - (${so.price.formatted_with_symbol})` }))

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
    
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);

  }
  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0])
  }

  const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });

    setShippingOptions(options);
    setShippingOption(options[0].id)
  };
  useEffect(() => {
    
    fetchShippingCountries(checkoutToken.id)
    
  }, []);
  useEffect(() => {
    if (shippingCountry) { 
      fetchSubdivisions(shippingCountry)
    }
  }, [shippingCountry])

  useEffect(() => {
    if (shippingOption) {
      fetchShippingOptions(checkoutToken.id,shippingCountry, shippingSubdivision)
    }
  })
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }) )} >
          <Grid container spacing={3}>
            <FormInput required name='firstName' label = 'First name' />
            <FormInput required name='lasttName' label = 'Last name' />
            <FormInput required name='address1' label = 'Address' />
            <FormInput required name='email' label = 'Email' />
            <FormInput required name='City' label = 'City' />
            <FormInput required name='Zip' label='Zip/ Postal code' />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                {countries.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.label}
                </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm = {6}>
              <InputLabel> Shipping Subdivisions</InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                {subdivisions.map((subsdivision) => (
                <MenuItem key={subsdivision.id} value={subsdivision.id}>
                  {subsdivision.label}
                </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm = {6}>
              <InputLabel> Shipping Options</InputLabel>
              <Select value={ shippingOption} fullWidth onChange={(e) =>setShippingOption(e.target.value) }>
                {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='outlined' component = {Link} to='cart'>
                  Back to Cart
            </Button>
            <Button variant='contained' color='primary' type='submit'>
                  Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm