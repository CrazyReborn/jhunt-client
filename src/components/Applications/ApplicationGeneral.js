/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ApplicationUpdateForm from './ApplicationUpdateForm';

export default function ApplicationGeneral(props) {
  const { application, rerender, setRerender } = props;
  const [updating, setUpdating] = useState(false);

  return (
    <div className="application">
      <h2>
        {application.position}
        {' at '}
        {application.company_name}
      </h2>
      <p>
        $
        {application.salary}
        {' in '}
        {application.location}
      </p>
      <button type="button" className="btn-details" onClick={() => setUpdating(true)}>Update</button>
      <ApplicationUpdateForm
        application={application}
        updating={updating}
        setUpdating={setUpdating}
        rerender={rerender}
        setRerender={setRerender}
      />
    </div>
  );
}
