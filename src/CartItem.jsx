import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItems = ({ onContinueShopping }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Helper function to format currency
  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  // Calculate the total cost for all items
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.cost, 0).toFixed(2);
  };

  // Increment item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement item quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      handleRemove(item.name);
    }
  };

  // Remove an item completely
  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <h3 className="cart-total">
        Total ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items):{' '}
        {formatCurrency(calculateTotalAmount())}
      </h3>

      {/* If cart is empty */}
      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty. Please add some items.</p>
          <button onClick={onContinueShopping}>Back to Products</button>
        </div>
      ) : (
        <div>
          {/* Display Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.name} className="cart-item">
                <img src={item.image} alt={item.name} width={200} height={200} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Unit Price: {formatCurrency(item.cost)}</p>
                  <p>Subtotal: {formatCurrency(item.quantity * item.cost)}</p>
                  <div className="item-actions">
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  <div>
                    <button
                      className="cart-item-delete"
                      onClick={() => handleRemove(item.name)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h3>
              Total ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items):{' '}
              {formatCurrency(calculateTotalAmount())}
            </h3>
            <div className=''>
            <button className='cart-item-last'
            onClick={onContinueShopping}>Continue Shopping</button>
            <button className='cart-item-last'
            onClick={() => alert('Checkout functionality to be implemented')}>
              Checkout
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
