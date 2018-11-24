import firebase from './firebase';

const emailMatch = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/;

function verifyEmail(email) {
  return new Promise((resolve, reject) => {
    emailMatch.test(email.toUpperCase()) ? resolve() : reject();
  });
}

function submitEmail(email) {
  return firebase.functions().httpsCallable('subscribe')({ email });
}

export default function emailDispatcher(dispatch) {
  return email => {
    dispatch({ type: 'SUBMIT_EMAIL' });
    verifyEmail(email)
      .then(() =>
        submitEmail(email)
          .then(result => dispatch({ type: 'EMAIL_SUCCEED', result }))
          .catch(error => dispatch({ type: 'SUBMIT_ERROR', error }))
      )
      .catch(() => dispatch({ type: 'INVALID_EMAIL', error: 'Email address failed verification' }));
  };
}
