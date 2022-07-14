import axios from 'axios';

const api = axios.create({
    baseURL: 'https://justeste.herokuapp.com',
})

export {api}