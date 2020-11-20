import axios from 'axios'
export const jsonAxios = axios.create({
  baseURL: 'https://panjs.com/ywc18.json',
})
