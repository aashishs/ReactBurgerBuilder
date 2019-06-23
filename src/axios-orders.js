import axios from 'axios';

const instance = axios.create({
    baseURL: "https://react-my-burger-ec138.firebaseio.com/"
});

export default instance;