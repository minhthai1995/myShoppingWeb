const getAllProduct = () => {
  const url = `https://cors-anywhere.herokuapp.com/http://unsmiling-plugs.000webhostapp.com/all_product.php`;
  return fetch(url)  //eslint-disable-line
  .then(res => res.json());
};

export default getAllProduct;
