const sendOrder = (token, arrayDetail) => (
  fetch('https://cors-anywhere.herokuapp.com/http://unsmiling-plugs.000webhostapp.com/cart.php', //eslint-disable-line
  {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
      Accept: 'aplication/json'
    },
    body: JSON.stringify({ token, arrayDetail })
  })
  .then(res => res.text())

);

module.exports = sendOrder;
