import axios from 'axios'

const axiosInstance = axios.create({
    //  to connect with backend
    baseURL: 'https://backend-lyart-six.vercel.app', 
})

export default axiosInstance