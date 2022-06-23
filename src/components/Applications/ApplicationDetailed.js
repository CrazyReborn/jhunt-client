import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import LoadingSpinner from '../LoadingSpinner';
import ApplicationDelete from './ApplicationDelete';
import ApplicationUpdateForm from './ApplicationUpdateForm';
import ErrorPopUp from './ErrorPopUp';
import '../../styles/ApplicationDetailed.css';

export default function ApplicationDetailed() {
  const { id } = useParams();
  const [application, setApplication] = useState('');
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [gotErr, setGotErr] = useState(false);

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
      .catch((err) => setErrors([err]))
      .finally(() => {
        if (errors.length > 0) {
          setGotErr(true);
        } else {
          setGotErr(false);
        }
      });
  }, [updating]);

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
            PLN per month
          </p>
          <p>
            {'Status: '}
            {application.status}
          </p>
          <p>
            {'Date: '}
            {typeof application.date === 'undefined'
              ? ''
              : format(parseISO(application.date), 'yyyy-MM-dd')}
          </p>
          <p>
            <a
              href={application.jobLink}
              target="_blank"
              rel="noreferrer"
            >
              Job link
            </a>
          </p>
          <p>
            {'Qualifications: '}
            {application.qualifications_met}
          </p>
          <div className="application-btns">
            <button
              className="btn-update"
              type="button"
              onClick={() => setUpdating(true)}
            >
              Update
            </button>
            <ApplicationDelete application={application} />
          </div>
          <ApplicationUpdateForm
            updating={updating}
            setUpdating={setUpdating}
            application={application}
          />
          <ErrorPopUp errors={errors} gotErr={gotErr} setGotErr={setGotErr} />
        </article>
      )
      : <LoadingSpinner />
  );
}
