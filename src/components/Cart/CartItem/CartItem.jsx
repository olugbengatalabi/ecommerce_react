import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './styles'
const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  const classes = useStyles();
  return (
    <div>
      <CardMedia alt={item.name} className={classes.media} />
      <CardContent className={classes.CardContent}>
        <Typography variant='h4'>
          {item.name}
        </Typography>
        <Typography variant='h5'>
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={classes.CardAction}>
        <div className={classes.buttons}>
          <Button type='button' size='small' onClick={()=> updateQuantity(item.id, item.quantity -1)}>-</Button>
          <Typography>{ item.quantity}</Typography>
          <Button type='button' size='small' onClick={()=> updateQuantity(item.id, item.quantity +1)}>+</Button>
          </div>
          <Button type='button' variant='contained' color='secondary' size='small' onClick={()=> removeFromCart(item.id)}>Remove</Button>
      </CardActions>
    </div>
  )
}

export default CartItem