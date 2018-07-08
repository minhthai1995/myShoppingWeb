import { AsyncStorage } from 'AsyncStorage';

const saveCart = async (cartArray) => {
  await AsyncStorage.setItem('@cart', JSON.stringify(cartArray));
};

export default saveCart;
