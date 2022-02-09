/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ApplicationGeneral(props) {
  const { application } = props;
  const navigate = useNavigate();
  const moveToDetailed = () => {
    navigate(application._id);
  };

  return (
    <tr onClick={() => moveToDetailed()}>
      <td>{application.company_name}</td>
      <td>{application.position}</td>
      <td>{application.location}</td>
      <td>{application.salary}</td>
    </tr>
  );
}
