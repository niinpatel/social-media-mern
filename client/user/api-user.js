import axios from 'axios';


let create = (user) => {
    return axios.post('/api/users', user).then(res => res.data)
}

let list = () => {
    return axios.get('/api/users').then(res => res.data)
}

export {
    create, list
}