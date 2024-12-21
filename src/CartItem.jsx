import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate the total cost of all items in the cart
  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.cost,
      0
    );
  };

  // Event handler for incrementing item quantity
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({ name: item.name, quantity: item.quantity + 1 })
    );
  };

  // Event handler for decrementing item quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    } else {
      handleRemove(item.name);
    }
  };

  // Event handler for removing an item from the cart
  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  // Event handler for continuing shopping
  const handleContinueShopping = () => {
    window.location.href = '/plants'; // Replace with the actual path to your plant listing page
  };

  // Event handler for checkout (not required for this project)
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.name} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>Unit Price: {item.cost}</p>
                  <p>Subtotal: {item.quantity * item.cost}</p>
                  <div className="cart-item-actions">
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                    <button onClick={() => handleRemove(item.name)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total Amount: {calculateTotalAmount()}</h3>
            <button onClick={handleContinueShopping}>Continue Shopping</button>
            <button onClick={handleCheckoutShopping}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
