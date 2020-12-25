import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-aa454-default-rtdb.firebaseio.com/',
});

export default instance;
