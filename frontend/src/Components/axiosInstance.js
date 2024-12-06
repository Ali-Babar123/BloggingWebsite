import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://blogging-website-weld.vercel.app',
})

export default axiosInstance