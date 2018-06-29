import saveToken from './saveToken';


const refreshToken = (token) => {
  fetch('http://unsmiling-plugs.000webhostapp.com/refresh_token.php', //eslint-disable-line
  {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
      Accept: 'aplication/json'
    },
    body: JSON.stringify({ token })
  })
  .then(res => res.text())
  .then(newToken => saveToken(newToken));
};

export default refreshToken;
