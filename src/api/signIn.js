const signIn = (email, password) => (
  fetch('https://cors-anywhere.herokuapp.com/https://unsmiling-plugs.000webhostapp.com/login.php', //eslint-disable-line
  {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
      Accept: 'aplication/json'
    },
    body: JSON.stringify({ 'email': email, 'password': password })
  })
  .then(res =>
    res.json()
  )

);

module.exports = signIn;
