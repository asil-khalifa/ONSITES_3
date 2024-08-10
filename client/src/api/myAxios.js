import axios from 'axios';

const axiosBase = axios.create({
    baseURL: 'http://localhost:2006'
});

export {axiosBase};