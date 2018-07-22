import axios from 'axios';


let create = (user) => {
    return axios.post('/api/users', user).then(res => res.data)
}

let list = () => {
    return axios.get('/api/users').then(res => res.data)
}

let signin = user => {
    return axios.post('/auth/signin', user).then(res => res.data)
}

let read = (params, credentials) => {
    return axios.get('/api/users/' + params.userId, {headers: {Authorization: 'Bearer ' + credentials.t}}).then(res => res.data)
}

let update = (params, credentials, user) => {     
    return axios.put('/api/users/' + params.userId, user, {headers: {Authorization: 'Bearer ' + credentials.t}}).then(res => res.data)
}

let remove = (params, credentials) => {
    return axios.delete('/api/users/' + params.userId, {headers: {Authorization: 'Bearer ' + credentials.t}}).then(res => res.data)
}


export {
    create, list, signin, read, update, remove
}