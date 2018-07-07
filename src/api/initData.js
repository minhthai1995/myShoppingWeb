const initData = async () => (
  await fetch('https://cors-anywhere.herokuapp.com/http://unsmiling-plugs.000webhostapp.com')  // eslint-disable-line
  .then(res => res.json())
);

export default initData;
