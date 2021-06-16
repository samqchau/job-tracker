import React, { useState } from 'react';
import { formatDate, trimDate } from '../helpers/dateHelpers';

const FooterEvent = ({ app }) => {
  let {
    offer_acceptance,
    offer,
    interview,
    deadline,
    application,
    date_applied,
  } = app;

  let text;

  if (offer_acceptance) {
    text = `Offer Deadline: ${formatDate(trimDate(offer_acceptance))}`;
  } else if (offer) {
    text = `Offer Recieved: ${formatDate(trimDate(offer))}`;
  } else if (interview) {
    text = `Interview: ${formatDate(trimDate(interview))}`;
  } else if (deadline) {
    text = `Application Deadline: ${formatDate(trimDate(deadline))}`;
  } else if (application) {
    text = `Applied On: ${formatDate(trimDate(application))}`;
  } else {
    text = `Created On: ${formatDate(trimDate(date_applied))}`;
  }
  return <div>{text}</div>;
};

export default FooterEvent;
