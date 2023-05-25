import axios from 'axios'

const axiosClient = axios.create({
  withCredentials: false,
  headers: {
    Accept: 'application/json'
  }
})

export default axiosClient
