import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://backend-lyart-six.vercel.app',
})

export default axiosInstance