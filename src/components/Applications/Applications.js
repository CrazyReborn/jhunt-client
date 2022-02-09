/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import ApplicationGeneral from './ApplicationGeneral';
import LoadingSpinner from '../LoadingSpinner';
import '../../styles/Applications.css';

export default function Applications({ rerender, setRerender }) {
  const [applications, setApplications] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}applications`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.applications === undefined) {
          setErrors(json.err.errors);
          setLoaded(true);
        } else {
          setApplications(json.applications);
          setLoaded(true);
        }
      })
      .catch((err) => {
        setErrors(['There was an error while fetching data: ', err]);
        setLoaded(true);
      });
  }, [rerender]);

  return (
    loaded
      ? (
        <>
          <div className="applications">
            <table className="application">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Location</th>
                  <th>Salary</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <ApplicationGeneral
                    key={application._id}
                    application={application}
                    rerender={rerender}
                    setRerender={setRerender}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {errors !== []
            ? (
              <div className="errors">
                {errors.map((err) => <p key={err.param}>{err.msg}</p>)}
              </div>
            )
            : ''}
        </>
      )
      : <LoadingSpinner />
  );
}
