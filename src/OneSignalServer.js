// Send Push
export function SendPushByEmail(email, message, campaign, datetime) {
  message = (message === '' ? 'Default Message' : message);
  campaign = (campaign === '' ? 'Default Campaign' : campaign);

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Basic ' + `${process.env.REACT_APP_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      app_id: `${process.env.REACT_APP_APP_ID}`,
      filters: [
        {"field": "tag", "key": "email", "relation": "=", "value": email},
      ],
      external_id: '',
      contents: {en: message},
      name: campaign,
      send_after: datetime,
    })
  };

  fetch('https://onesignal.com/api/v1/notifications', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}

export function SendPushToAll() {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Basic ' + `${process.env.REACT_APP_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      app_id: `${process.env.REACT_APP_APP_ID}`,
      included_segments: ['Subscribed Users'],
      external_id: '',
      contents: {en: 'Hello All', es: 'Hola'},
      name: 'Campaign 2'
    })
  };

  fetch('https://onesignal.com/api/v1/notifications', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
