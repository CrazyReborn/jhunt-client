import { useState } from 'react';
import '../styles/LandingPage.css';

export default function LandingPage () {
  const [btnActive, setBtnActive] = useState(true);
  return (
    <div className='segment-one'>
      <article className='primary-content'>
      <h1>Ease you job hunting process</h1>
      <p>With JHUNT managing dozens of sent applications is easy and fast. Don't spend your time 
        remembering when, why and how you applied. Use valuable time on something more important.</p>
      <button className={btnActive ? 'btn-action' : 'btn-action loading'} onClick={() => setBtnActive(!btnActive)}><span className='btn-text'>Get Started</span></button>
      </article>
    </div>
  )
}