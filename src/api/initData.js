const initData = async () => (
  await fetch('https://cors.io/?http://unsmiling-plugs.000webhostapp.com')  // eslint-disable-line
  .then(res => res.json())
);

export default initData;
