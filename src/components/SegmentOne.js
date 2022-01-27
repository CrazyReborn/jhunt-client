import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SegmentOne.css';

export default function SegmentOne() {
  const [btnActive, setBtnActive] = useState(true);
  const navigate = useNavigate();
  const getStarted = () => {
    setBtnActive(!btnActive);
    if (typeof token !== 'undefined') {
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
