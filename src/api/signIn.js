const signIn = (email, password) => (
  fetch('http://unsmiling-plugs.000webhostapp.com/login.php', //eslint-disable-line
  {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
      Accept: 'aplication/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())

);

module.exports = signIn;
