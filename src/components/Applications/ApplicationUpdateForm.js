/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';

export default function ApplicationUpdateForm(props) {
  const { application, setUpdating } = props;
  const [companyName, setCompanyName] = useState(application.company_name);
  const [position, setPosition] = useState(application.position);
  const [salary, setSalary] = useState(application.salary);
  const [status, setStatus] = useState(application.status);
  const [location, setLocation] = useState(application.location);
  const [aggregator, setAggregator] = useState(application.aggregator);
  const [foundOn, setFoundOn] = useState(format(parseISO(application.found_on), 'yyyy-MM-dd'));
  const [cvSentOn, setCvSentOn] = useState(format(parseISO(application.cv_sent_on), 'yyyy-MM-dd'));
  const [cvPath, setCvPath] = useState(application.cv_path);
  const [jobLink, setJobLink] = useState(application.job_link);
  const [answerReceived, setAnswerReceived] = useState(format(parseISO(application.answer_received), 'yyyy-MM-dd'));
  const [qualificationsMet, setQualificationsMet] = useState(application.qualifications_met);
  const [errors, setErrors] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_SERVER}applications/${application._id}`, {
      method: 'PUT',
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
        aggregator,
        foundOn,
        cvSentOn,
        cvPath,
        jobLink,
        answerReceived,
        qualificationsMet,
      }),
    }).then((res) => res.json())
      .then((json) => {
        if (typeof json.msg !== 'undefined') {
          setUpdating(false);
        } else {
          setErrors(json.err.errors);
        }
      })
      .catch((err) => setErrors(err));
  };

  const cancelUpdate = () => {
    setUpdating(false);
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
            <option value="Rejection">Rejection</option>
            <option value="Upcoming interview">Upcoming interview</option>
            <option value="Offered">Offered</option>
          </select>
        </label>
        <label htmlFor="location">
          Location
          <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <label htmlFor="aggregator">
          Aggregator
          <input type="text" id="aggregator" value={aggregator} onChange={(e) => setAggregator(e.target.value)} />
        </label>
        <label htmlFor="foundOn">
          Offer was found on:
          <input type="date" id="foundOn" value={foundOn} onChange={(e) => setFoundOn(e.target.value)} />
        </label>
        <label htmlFor="cvSentOn">
          CV was sent on:
          <input type="date" id="cvSentOn" value={cvSentOn} onChange={(e) => setCvSentOn(e.target.value)} />
        </label>
        <label htmlFor="cvPath">
          Upload CV
          <input type="file" id="cvPath" value={cvPath} onChange={(e) => setCvPath(e.target.value)} />
        </label>
        <label htmlFor="jobLink">
          Link to the offer:
          <input type="text" id="jobLink" value={jobLink} onChange={(e) => setJobLink(e.target.value)} />
        </label>
        <label htmlFor="answerReceivedOn">
          Answer received on:
          <input type="date" id="answerReceivedOn" value={answerReceived} onChange={(e) => setAnswerReceived(e.target.value)} />
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
        <button type="button" onClick={() => cancelUpdate()}>Cancel Update</button>
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
