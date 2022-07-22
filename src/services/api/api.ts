import axios from 'axios';

const api = axios.create({
    baseURL: 'http://rpa.doc9.com.br/api',
})

export {api}