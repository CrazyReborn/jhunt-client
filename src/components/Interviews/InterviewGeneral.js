/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function InterviewGeneral(props) {
  const { interview } = props;
  const navigate = useNavigate();

  const moveToDetails = () => {
    navigate(`${interview._id}`);
  };

  return (
    <div className="interviewGeneralItem">
      <p>
        {'Interview at '}
        {interview.application.company_name}
      </p>
      <p>
        {interview.date}
      </p>
      <button type="button" className="btn-details" onClick={() => moveToDetails()}>Details</button>
    </div>
  );
}
