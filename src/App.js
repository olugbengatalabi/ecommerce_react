import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce.js';
import Products from './components/products/Products';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './components/CheckoutForm/Checkout/Checkout.jsx';
const App = () => {
  const [cart, setCart] = useState({})
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({})
  const [errorMsg, setErrorMsg] = useState('')
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data)

  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
    console.log(cart);
  };


  const addToCart = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    console.log(response);
    setCart(response.cart)
    console.log(cart);

    // or you can just destructure cart directily, check below
  }

  const updateQuantity = async (productId, quantity) => {
    const {cart}= await commerce.cart.update(productId, { quantity })
    setCart(cart)
  }
  const removeFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId)
    setCart(cart)
  }

  const emptyCart = async () => {
    const { cart } = await commerce.cart.empty()
    setCart(cart)
  }
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()
    setCart(newCart);
  }

  const captureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart()

    } catch (error) {
      setErrorMsg(error.data.error.message)
    }
  }
  useEffect(() => {
    fetchProducts();
    fetchCart(); 
  },[])
  
  
  return (
    <Router>
      <div> 
        <Navbar totalItems={cart.totalItems} />
        <Routes>
          <Route path='/' element={<Products addToCart={addToCart} products = {products} />} />
          <Route path='/cart' element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} emptyCart={emptyCart} />} /> 
          <Route path='/checkout' element={<Checkout cart={cart} order = {order} captureCheckout = {captureCheckout} error = {errorMsg} />} /> 
        </Routes>
      </div>
    </Router>
  )
}

export default App;