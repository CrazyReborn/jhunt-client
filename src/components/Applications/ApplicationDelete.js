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
      .then((res) => res.json())
      .then((json) => {
        if (typeof json.msg !== 'undefined') {
          navigate('dashboard/applications');
        }
      });
  };
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input className="btn-update-delete" type="submit" value="Delete" />
    </form>
  );
}
