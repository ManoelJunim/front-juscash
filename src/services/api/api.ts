import axios from 'axios';

const api = axios.create({
    baseURL: 'https://rpa.doc9.com.br/api',
})

export {api}