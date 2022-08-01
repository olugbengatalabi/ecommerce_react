import React, {useState, useEffect} from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import useStyles from './styles.js'
import AddressForm from '../AddressForm.jsx';
import PaymentForm from '../PaymentForm.jsx';
import { commerce } from '../../../lib/commerce'
import { Link, useHistory } from 'react-router-dom';


const steps = ['shipping address', 'payment ']

const Checkout = ({cart, order, captureCheckout, error}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setcheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({})
  const history = useHistory()
  const [isFinished, setIsFinished] = useState(false)
  
  useEffect(() => {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
          console.log(token);
          setcheckoutToken(token)
        } catch (error) {
          history.pushState('/');
        }
      }
      generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  const next = (data) => {
    setShippingData()
    nextStep()
  }


  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true)
    }, 3000)
  }
  let Confirmation = () => order.costumer ? (
    <>
      <CssBaseline />
      <div className="">
        <Typography variant='h5'> Thank you for your purchase, {order.customer.firstname} {order.customer.lowercase}</Typography>
        <Divider className='subtitle2'> Order ref: {order.customer.reference}</Divider>
        <br />
        <Button vairiant='outlined' component={Link} to='/'>Back home</Button>
      </div>
    </>
  ) : isFinished ? (
    <>
      
      <div className="">
        <Typography variant='h5'> Thank you for your purchase</Typography>
        <Divider className='divider'></Divider>
        <br />
        <Button vairiant='outlined' component={Link} to='/'>Back home</Button>
      </div>
    </>
  ): (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  );
  if (error) {
    <>
      <Typography variant='h5'> {error}</Typography>
      <br />
      <Button vairiant = 'outlined' component = {Link} to ='/'>Back home</Button> 
    </>
  }
  const Form = () => {
    return activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next} /> : <PaymentForm timeout = {timeout} shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} captureCheckout={captureCheckout} nextStep= {nextStep}/>;
  }
  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={0} className= {classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> :checkoutToken && <Form/>}
        </Paper>
      </main>
    </>
    
  )
}

export default Checkout