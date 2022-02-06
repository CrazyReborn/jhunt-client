/* eslint-disable react/prop-types */
import React from 'react';

export default function OfferDetails(props) {
  const { offer } = props;
  const { setIsOpen } = props;
  const deleteOffer = () => {
    fetch(`${process.env.REACT_APP_API_SERVER}offers/${offer._id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        if (typeof json.err !== 'undefined') {
          console.log(json.err);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <button type="button" onClick={() => deleteOffer()}>Delete</button>
      <button type="button" onClick={() => setIsOpen(true)}>Update</button>
    </>
  );
}
