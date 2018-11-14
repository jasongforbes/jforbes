const functions = require('firebase-functions');
const request = require('request');

exports.subscribe = functions.https.onCall(data => {
  const email = data.email;
  const config = functions.config().mailchimp;
  if (!(typeof email === 'string') || email.length === 0) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with one arguments "email" containing the email to add.'
    );
  }

  return new Promise((resolve, reject) => {
    request(
      {
        url: `https://${config.dc}.api.mailchimp.com/3.0/lists/${config.listid}/members/`,
        method: 'POST',
        json: true,
        auth: {
          user: 'username',
          pass: config.key,
          sendImmediately: true,
        },
        body: {
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            EMAIL: email,
          },
        },
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          resolve({ subscribed: true });
        } else if (response.statusCode === 400 && response.body.title === 'Member Exists') {
          resolve({ subscribed: true });
        }
        reject(Error(response.body.detail));
      }
    );
  });
});
