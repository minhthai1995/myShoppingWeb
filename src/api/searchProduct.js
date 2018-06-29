const searchProduct = (key) => {
  const url = `http://unsmiling-plugs.000webhostapp.com/search.php?key=${key}`;
  console.log('url ne', url);
  return fetch(url)  //eslint-disable-line
  .then(res => res.json());
};

export default searchProduct;
