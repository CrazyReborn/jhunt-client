/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ApplicationDelete(props) {
  const { application } = props;
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_SERVER}applications/${application._id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => {
        res.json();
        navigate('../applications/', { replace: true });
      })
      .then((json) => {
        if (typeof json.msg !== 'undefined') {
          navigate('../applications/', { replace: true });
        }
      });
  };
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input className="btn-delete" type="submit" value="Delete" />
    </form>
  );
}
