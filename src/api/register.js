const register = (email, name, password) => (
  fetch('https://cors-anywhere.herokuapp.com/https://unsmiling-plugs.000webhostapp.com/register.php',  //eslint-disable-line
  {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
      Accept: 'aplication/json'
    },
    body: JSON.stringify({ email, name, password })
  })
  .then(res => res.text())

);

module.exports = register;
