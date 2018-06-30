import { AsyncStorage } from 'AsyncStorage';

const saveToken = async (token) => {
  await AsyncStorage.setItem('@token', token);
};

export default saveToken;
