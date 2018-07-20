import axios from 'axios'

let signin = user => {
    return axios.post('/auth/signin', user).then(res => res.data)
}

let signout = () => {
    return axios.get('/auth/signout').then(res => res.data)
}

export {
    signin,
    signout
}