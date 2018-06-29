const changeInfo = (token, name, phone, address) => (
  fetch('http://unsmiling-plugs.000webhostapp.com/change_info.php', //eslint-disable-line
  {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
      Accept: 'aplication/json'
    },
    body: JSON.stringify({ token, name, phone, address })
  })
  .then(res => res.json())
);

module.exports = changeInfo;
