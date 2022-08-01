import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/img/logo.png';
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';
const Navbar = ({totalItems}) => {
  const classes = useStyles();
  const location = useLocation();
  if (location.pathname === '/') {
    
  }
  return (
    <>
      <AppBar position='fixed' className={classes.appbar} color='inherit'>
        <Toolbar variant='regular' className={classes.title} color='inherit'>
          <Typography component={ Link} to = '/'variant ='h6' className = {classes.title} color = 'inherit'>
            <img src={logo } alt = 'shopX' height='25px' />
          </Typography>
          <div className={classes.grow} />
          {location.pathname === '/' && (
            <div className={classes.button}>
              <IconButton component={Link} to='/cart' aria-label='show cart items' color="inherit">
                <Badge badgeContent={totalItems} color='secondary'>
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>)}
        </Toolbar>
      </AppBar>
    </>
  )
};

export default Navbar