import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/newApplicationForm.css';

export default function NewApplicationForm() {
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [qualificationsMet, setQualificationsMet] = useState('');
  const [errors, setErrors] = useState([]);
  const navigation = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_SERVER}applications`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyName,
        position,
        salary,
        status,
        location,
        qualificationsMet,
      }),
    }).then((res) => res.json())
      .then((json) => {
        console.log(json.msg, json.err);
        if (typeof json.msg === 'undefined') {
          setErrors(json.err.errors);
        } else navigation('/dashboard/applications');
      })
      .catch((err) => setErrors(err));
  };

  return (
    <>
      <form className="newApplication" onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="companyName">
          Company Name
          <input type="text" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </label>
        <label htmlFor="position">
          Position
          <input type="text" id="position" value={position} onChange={(e) => setPosition(e.target.value)} />
        </label>
        <label htmlFor="salary">
          Salary
          <input type="number" id="salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
        </label>
        <label htmlFor="status">
          Status
          <select defaultValue={status} id="status" onChange={(e) => setStatus(e.target.value)}>
            <option value={null}>--Please select an option--</option>
            <option value="Application sent">Application sent</option>
            <option value="No answer">No answer</option>
            <option value="No offer">No offer</option>
            <option value="Phone call">Phone call</option>
            <option value="Interview">Interview</option>
            <option value="Offered">Offered</option>
          </select>
        </label>
        <label htmlFor="location">
          Location
          <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <label htmlFor="qualificationsMet">
          Qualifications:
          <select defaultValue={qualificationsMet} id="qualificationsMet" onChange={(e) => setQualificationsMet(e.target.value)}>
            <option value={null}>--Please select an option--</option>
            <option value="Fully met">Fully met</option>
            <option value="Mostly met">Mostly met</option>
            <option value="Half are met">Half are met</option>
            <option value="Mostly unmet">Mostly unmet</option>
            <option value="Fully unmet">Fully unmet</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
      {errors.length > 0
        ? (
          <div className="errors">
            {errors.map((err) => <p key={err.param}>{err.msg}</p>)}
          </div>
        )
        : ''}
    </>
  );
}
