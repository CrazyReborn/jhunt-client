/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ReactFlow, { Position } from 'react-flow-renderer';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import LoadingSpinner from './LoadingSpinner';

export default function Profile() {
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [elements, setElements] = useState([]);
  const [tree, setTree] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const createApplicationsElements = (applicationsArray) => {
    const newArray = applicationsArray.map((application, index) => ({
      id: application._id,
      type: 'input',
      data: {
        label: `Listing at ${application.company_name}`,
      },
      position: { x: 250 + 200 * (applicationsArray.length) * index, y: 0 },
      draggable: false,
      isHidden: false,
    }));
    return newArray;
  };

  const createInterviewsElements = (interviewsArray) => {
    const newArray = interviewsArray.map((interview, index) => ({
      id: interview._id,
      type: 'default',
      data: {
        label: `Interview on ${format(parseISO(interview.date), 'yyyy-MM-dd')}`,
      },
      position: { x: 100 + 75 * (interviewsArray.length - 1) * index, y: 100 + 75 * index },
      draggable: false,
      isHidden: false,
    }));
    const connections = interviewsArray.map((interview) => ({
      id: `${interview._id}-${interview.application}`,
      source: interview.application,
      target: interview._id,
    }));
    const results = newArray.concat(connections);
    return results;
  };

  const createOffersElement = (offerArray) => {
    const offerElementsArray = offerArray.map((offer, index) => ({
      id: offer._id,
      type: 'output',
      data: {
        label: `Offer was received ${format(parseISO(offer.received), 'yyyy-MM-dd')}`,
      },
      position: { x: 75 + 25 * index, y: 200 * (index + 1) },
      draggable: false,
      isHidden: false,
    }));
    const connections = offerArray.map((offer, index) => ({
      id: `${offer._id}-${offer.interview}`,
      source: offer.interview,
      target: offer._id,
    }));
    const results = offerElementsArray.concat(connections);
    return results;
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}profile`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        if (typeof json.err !== 'undefined') {
          console.log('Fetching error', json.err);
        } else {
          setApplications(json.applications);
          setInterviews(json.interviews);
          setElements(createApplicationsElements(json.applications));
          setElements((old) => old.concat(createInterviewsElements(json.interviews)));
          setElements((old) => old.concat(createOffersElement(json.offers)));
        }
      })
      .catch((err) => console.log('error: ', err))
      .finally(setLoaded(true));
  }, []);

  return (
    loaded
      ? (
        <ReactFlow elements={elements} />
      )
      : <LoadingSpinner />
  );
}
