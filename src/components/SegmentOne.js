import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SegmentOne.css';

export default function SegmentOne() {
  const [btnActive, setBtnActive] = useState(true);
  const [access, setAccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REST_APP_API_SERVER}signin`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        setAccess(true);
      } else {
        setAccess(false);
      }
    })
      .catch((err) => console.log(err));
  });
  const getStarted = () => {
    setBtnActive(!btnActive);
    if (!access) {
      navigate('/signin');
    } else {
      navigate('/dashboard/applications');
    }
  };
  return (
    <div className="segment-one">
      <article className="primary-content">
        <h1>Ease you job hunting process</h1>
        <p>
          With JHUNT managing dozens of sent applications is easy and fast.
          Don`&quot;`apost spend your time
          remembering when, why and how you applied. Use valuable time on something more important.
        </p>
        <button type="button" className={btnActive ? 'btn-action' : 'btn-action loading'} onClick={() => getStarted()}><span className="btn-text">Get Started</span></button>
      </article>
    </div>
  );
}
