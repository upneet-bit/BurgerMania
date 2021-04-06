import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-react-932d5-default-rtdb.firebaseio.com/'
});

export default instance;