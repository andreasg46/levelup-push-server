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
        { "field": "tag", "key": "email", "relation": "=", "value": email },
      ],
      external_id: '',
      contents: { en: message },
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
      contents: { en: 'Hello All', es: 'Hola' },
      name: 'Campaign 2'
    })
  };

  fetch('https://onesignal.com/api/v1/notifications', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}

export async function getDevices() {
  let data = '';
  const url = 'https://onesignal.com/api/v1/players?app_id='.concat(process.env.REACT_APP_APP_ID) + '&limit=300&offset=offset';
  const options = {
    method: 'GET',
    headers: { Accept: 'text/plain', Authorization: 'Basic ' + `${process.env.REACT_APP_API_KEY}` }
  };
  await fetch(url, options)
    .then(res => res.json())
    .then(json => {
      data = json;
    })
    .catch(err => console.error('error:' + err));

  return data;
}

export async function DeleteDevice(playerId) {
  const options = {
    method: 'DELETE',
    headers: { Accept: 'application/json', Authorization: 'Basic ' + `${process.env.REACT_APP_API_KEY}` }
  };

  await fetch('https://onesignal.com/api/v1/players/' + playerId + '?app_id=' + `${process.env.REACT_APP_APP_ID}`, options)
    .then(response => response.json())
    .then(response => {
      console.log(response);
    })
    .catch(err => console.error(err));

}