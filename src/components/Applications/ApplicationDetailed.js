import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';

export default function ApplicationDetailed() {
  const { id } = useParams();
  const [application, setApplication] = useState('');
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    fetch(`process.env.REACT_APP_API_SERVERapplications/${id}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.application !== undefined) {
          setApplication(json.application);
          setLoaded(true);
        } else {
          setErrors(json.err.errors);
        }
      })
      .catch((err) => setErrors([err]));
  }, [id]);

  return (
    loaded
      ? (
        <article className="detailed">
          <h2>
            Company:
            {application.company_name}
          </h2>
          <p>
            Position:
            {application.position}
          </p>
          <p>
            Salary:
            {application.salary}
            $ per month
          </p>
          <p>
            Status:
            {application.status}
          </p>
          <p>
            Location:
            {application.location}
          </p>
          <p>
            Aggregator:
            {application.aggregator}
          </p>
          <p>
            Found on
            {application.found_on}
          </p>
          <p><a href={application.job_link}>Job link</a></p>
          <p>
            Answers received:
            {application.answer_received}
          </p>
          <p>
            Qualifications
            {application.qualifications_met}
          </p>
        </article>
      )
      : <LoadingSpinner />
  );
}
