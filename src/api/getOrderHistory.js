const getOrderHistory = (token) => (
  fetch('http://unsmiling-plugs.000webhostapp.com/order_history.php',  //eslint-disable-line
  {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
      Accept: 'aplication/json'
    },
    body: JSON.stringify({ token })
  })
  .then(res => res.json())

);

module.exports = getOrderHistory;
