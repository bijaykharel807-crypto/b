import React, { useCallback } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { Button } from '../components/Button.jsx';

/** @typedef {import('../jsdoc-types').NavigateFunction} NavigateFunction */

/**
 * @param {object} props
 * @param {NavigateFunction} props.onNavigate 
 */
export const CartPage = ({ onNavigate }) => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, itemCount } = useCart();

  const handleUpdateQuantity = useCallback((productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  }, [updateQuantity]);

  const handleRemoveItem = useCallback((productId) => {
    removeFromCart(productId);
  }, [removeFromCart]);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center min-h-screen">
        <h2 className="text-4xl font-bold text-slate-800 mb-6">Your Cart is Empty</h2>
        <p className="text-lg text-slate-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button variant="primary" size="lg" onClick={() => onNavigate('shop')}>
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <h1 className="text-5xl font-bold text-slate-800 text-center mb-12">Your Shopping Cart</h1>

      <div className="lg:grid lg:grid-cols-3 lg:gap-10">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
          <ul className="divide-y divide-gray-100">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center py-6">
                <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-gray-100 mr-6">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold text-slate-800 mb-1">{item.name}</h2>
                  <p className="text-lg text-indigo-600 font-bold mb-3">${item.price.toFixed(2)}</p>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="text-slate-600 hover:text-indigo-600 focus:outline-none text-2xl"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.id, Number(e.target.value))}
                      className="w-16 p-2 border-2 border-slate-100 rounded-lg text-center font-medium focus:border-indigo-500 outline-none"
                      min="1"
                      aria-label={`Quantity of ${item.name}`}
                    />
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="text-slate-600 hover:text-indigo-600 focus:outline-none text-2xl"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                    <Button
                      variant="text"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 ml-auto"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="ml-auto text-xl font-bold text-slate-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-1 mt-10 lg:mt-0 bg-white rounded-2xl shadow-lg p-8 h-fit">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Order Summary</h2>
          <div className="space-y-4 text-lg">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="text-slate-700">Total Items:</span>
              <span className="font-semibold text-slate-800">{itemCount}</span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="text-slate-700">Subtotal:</span>
              <span className="font-semibold text-slate-800">${cartTotal.toFixed(2)}</span>
            </div>
        
            <div className="flex justify-between items-center pt-4 border-t-2 border-indigo-200">
              <span className="text-2xl font-bold text-slate-800">Grand Total:</span>
              <span className="text-2xl font-bold text-indigo-600">${cartTotal.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <Button variant="secondary" size="lg" className="w-full" onClick={() => alert('Proceeding to Checkout!')}>
              Proceed to Checkout
            </Button>
            <Button variant="outline" size="lg" className="w-full" onClick={() => onNavigate('shop')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};