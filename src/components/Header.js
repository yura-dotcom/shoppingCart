import React, { useState, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';
import { useCart } from '../contexts/useCart';
import CartIcon from '../supermarket.svg';
import Cart from './Cart';

export default function Header() {
  const { cart } = useCart();

  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useOnClickOutside(modalRef, () => setIsOpen(false));

  return (
    <header>
      <div className="container">
        <div className="cart-button">
          <button onClick={() => setIsOpen(!isOpen)}>
            <img src={CartIcon} width="30" />({cart.length})
          </button>
        </div>
        {/* show modal */}
        <div className='cart-modal' ref={modalRef} style={{display: isOpen ? 'block' : 'none'}}>
          <Cart/>
        </div>
      </div>
    </header>
  );
}
