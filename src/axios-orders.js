import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burgerbuilder-23f28.firebaseio.com/'
})

export default instance;