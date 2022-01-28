/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function InterviewGeneral(props) {
  const { interview } = props;
  const navigate = useNavigate();

  const moveToDetails = () => {
    navigate(`${interview.id}`);
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
      <button type="button" className="btn-action" onClick={() => moveToDetails()}>Details</button>
    </div>
  );
}