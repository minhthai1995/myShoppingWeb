import { AsyncStorage } from 'AsyncStorage';

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@token');
    console.log('token tra ve::', value);
    if (value !== null) {
      return value;
    }
    return '';
  } catch (error) {
    return '';
  }
};

export default getToken;
