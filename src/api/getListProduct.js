const getListProduct = (idType, page) => {
  const url = `http://unsmiling-plugs.000webhostapp.com/product_by_type.php?id_type=${idType}&page=${page}`;
  return fetch(url)  //eslint-disable-line
  .then(res => res.json());
};

export default getListProduct;
