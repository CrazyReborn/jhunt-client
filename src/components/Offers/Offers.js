import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import OfferGeneral from './OfferGeneral';
import OfferUpdateForm from './OfferUpdateForm';

export default function Offers() {
  const [offers, setOffers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}offers`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        if (typeof json.err !== 'undefined') {
          setErrors(json.err);
          setLoaded(true);
        } else {
          setOffers(json.offers);
          setLoaded(true);
        }
      }, [1]);
  });

  return (
    loaded
      ? (
        <div>
          {offers.map((offer) => (
            <OfferGeneral setIsOpen={setIsOpen} offer={offer} key={offer._id} />))}
          <OfferUpdateForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      )
      : <LoadingSpinner />
  );
}
