import axios from "axios";

let listNewsFeed = (params, credentials) => {
    return axios.get('/api/posts/feed/' + params.userId, { headers: { Authorization: 'Bearer ' + credentials.t } }).then(res => res.data)
}

let create = (params, credentials, post) => {
    return axios.post('/api/posts/new/' + params.userId, post, {headers: {Authorization: 'Bearer ' + credentials.t}}).then(res => res.data)
}

export {
    listNewsFeed, create
}

