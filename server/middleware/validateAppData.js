const emptyDateToNull = (date) => {
  return date === '' ? null : date;
};

export const validateAppData = (req, res, next) => {
  let { deadline, application, offer, offer_acceptance, interview } = req.body;

  req.body.deadline = emptyDateToNull(deadline);
  req.body.application = emptyDateToNull(application);
  req.body.offer = emptyDateToNull(offer);
  req.body.offer_acceptance = emptyDateToNull(offer_acceptance);
  req.body.interview = emptyDateToNull(interview);

  next();
};
