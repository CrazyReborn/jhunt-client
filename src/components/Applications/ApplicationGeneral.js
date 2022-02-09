/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ApplicationUpdateForm from './ApplicationUpdateForm';

export default function ApplicationGeneral(props) {
  const { application, rerender, setRerender } = props;
  const [updating, setUpdating] = useState(false);

  return (
    <>
      <tr onClick={() => { setUpdating(true); console.log(updating); }}>
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
