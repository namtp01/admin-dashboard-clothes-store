import axios from 'axios'

const api = axios.create({
    baseURL: 'https://server-clothes-store.onrender.com'
})

export default api