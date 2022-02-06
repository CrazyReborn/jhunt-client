import React from 'react';
import reactDom from 'react-dom';
import '../../styles/OfferUpdateForm.css';

export default function OfferUpdateForm({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return reactDom.createPortal(
    <div className="offer-form-wrapper">
      OfferUpdateForm
      <button type="button" onClick={onClose}>close</button>
      {children}
    </div>,
    document.getElementById('portal'),
  );
}
