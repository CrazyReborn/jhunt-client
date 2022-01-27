/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ApplicationGeneral(props) {
  const { application } = props;
  const navigation = useNavigate();

  const showDetail = () => {
    navigation(`${application._id}`);
  };
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
      <button type="button" className="btn-action" onClick={() => showDetail()}>Details</button>
    </div>
  );
}
