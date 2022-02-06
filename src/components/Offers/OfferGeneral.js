/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import OfferDetails from './OfferDetails';

export default function OfferGeneral(props) {
  const { offer } = props;
  const { setIsOpen } = props;
  const [showDetails, setShowDetails] = useState(false);

  const onClickChangeShowDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div className="offer-general">
      <h3>
        {'Offer at '}
        {offer.application.comapny_name}
      </h3>
      <button type="button" onClick={() => onClickChangeShowDetails()}>
        Show Details
        <span className="show-detail-span" />
      </button>
      {showDetails
        ? (
          <OfferDetails setIsOpen={setIsOpen} offer={offer} />
        )
        : ''}
    </div>
  );
}
