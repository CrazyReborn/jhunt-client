import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import LoadingSpinner from '../LoadingSpinner';
import ApplicationDelete from './ApplicationDelete';
import ApplicationUpdateForm from './ApplicationUpdateForm';
import '../../styles/ApplicationDetailed.css';

export default function ApplicationDetailed() {
  const { id } = useParams();
  const [application, setApplication] = useState('');
  const [, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}applications/${id}`, {
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
          setLoaded(true);
        }
      })
      .catch((err) => setErrors([err]));
  }, [id]);
  if (!updating) {
    return (
      loaded
        ? (
          <article className="detailed">
            <h2>
              {'Company: '}
              {application.company_name}
            </h2>
            <p>
              {'Position: '}
              {application.position}
            </p>
            <p>
              {'Salary: '}
              {application.salary}
              $ per month
            </p>
            <p>
              {'Status: '}
              {application.status}
            </p>
            <p>
              {'Location: '}
              {application.location}
            </p>
            <p>
              {'Aggregator: '}
              {application.aggregator}
            </p>
            <p>
              {'Found on: '}
              {typeof application.found_on === 'undefined'
                ? ''
                : format(parseISO(application.found_on), 'yyyy-MM-dd')}
            </p>
            <p>
              <a
                href={application.job_link}
                target="_blank"
                rel="noreferrer"
              >
                Job link
              </a>
            </p>
            <p>
              {'Answers received: '}
              {typeof application.answer_received === 'undefined'
                ? ''
                : format(parseISO(application.answer_received), 'yyyy-MM-dd')}
            </p>
            <p>
              {'Qualifications: '}
              {application.qualifications_met}
            </p>
            <div className="application-btns">
              <button
                className="btn-update-delete"
                type="button"
                onClick={() => setUpdating(true)}
              >
                Update
              </button>
              <ApplicationDelete application={application} />
            </div>
          </article>
        )
        : <LoadingSpinner />
    );
  } return (
    <ApplicationUpdateForm setUpdating={setUpdating} application={application} />
  );
}
