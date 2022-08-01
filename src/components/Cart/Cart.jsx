import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles.js';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = ({cart, updateQuantity, removeFromCart, emptyCart}) => {
  const classes = useStyles();
  const EmptyCart = () => {
    <Typography variant='subtitle'> No items in the cart, add items now
      <Link className={classes.link}>Add some items first!</Link>
    </Typography>
  }
  if (!cart.line_items) return 'Loading...';

  const FilledCart = () => {
    return(
      <>
        <Grid container spacing={3}>
          {cart.line_items.map((item) => (
            <Grid item xs={12} key={item.id}>
              <CartItem item = {item} updateQuantity={updateQuantity} removeFromCart = {removeFromCart} />
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant='h6'>Subtotal: {cart.subtotal.formatted_with_symbol}
          </Typography>
          <div className="">
            <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary' onClick={emptyCart}>Empty cart</Button>
            <Button component={Link} to = '/checkout' className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary'>checkout</Button>
          </div>
        </div>
      </>

    )
  }
  

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant='h3' > ShopX Cart</Typography>
      {!cart.line_items.length ? <EmptyCart/> : <FilledCart/>}
    </Container>
  )
}

export default Cart


// emptycart and filled carts are not really subcomponents, theyre just functions that return some jsx even though they appear to be components