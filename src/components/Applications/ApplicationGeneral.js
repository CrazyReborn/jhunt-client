/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplicationUpdateForm from './ApplicationUpdateForm';

export default function ApplicationGeneral(props) {
  const { application, rerender, setRerender } = props;
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();
  const moveToDetailed = () => {
    navigate(application._id);
  };

  return (
    <>
      <tr onClick={() => moveToDetailed()}>
        <td>{application.company_name}</td>
        <td>{application.position}</td>
        <td>{application.location}</td>
        <td>{application.salary}</td>
      </tr>
      <ApplicationUpdateForm
        application={application}
        updating={updating}
        setUpdating={setUpdating}
        rerender={rerender}
        setRerender={setRerender}
      />
    </>
  );
}
