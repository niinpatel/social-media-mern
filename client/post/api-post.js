import axios from "axios";

let listNewsFeed = (params, credentials) => {
    return axios.get('/api/posts/feed/' + params.userId, { headers: { Authorization: 'Bearer ' + credentials.t } }).then(res => res.data)
}

let create = (params, credentials, post) => {
    return axios.post('/api/posts/new/' + params.userId, post, { headers: { Authorization: 'Bearer ' + credentials.t } }).then(res => res.data)
}

let like = (params, credentials, postId) => {
    return axios.put('/api/posts/like', { userId: params.userId, postId: postId }, { headers: { Authorization: 'Bearer ' + credentials.t } }).then(res => res.data)
}

let unlike = (params, credentials, postId) => {
    return axios.put('/api/posts/unlike', { userId: params.userId, postId: postId }, { headers: { Authorization: 'Bearer ' + credentials.t } }).then(res => res.data)
}

let remove = (credentials, postId) => {
    return axios.delete('/api/posts/' + postId, { headers: { Authorization: 'Bearer ' + credentials.t } }).then(res => res.data)
}

let comment = (params, credentials, postId, comment) => {
    return axios.put('/api/posts/comment', { userId: params.userId, postId: postId, comment: comment }, { headers: { Authorization: 'Bearer ' + credentials.t } }).then(res => res.data)
}

let uncomment = (params, credentials, postId, comment) => {
    return axios.put('/api/posts/uncomment', { userId: params.userId, postId: postId, comment: comment }, { headers: { Authorization: 'Bearer ' + credentials.t } }).then(res => res.data)
}

export {
    listNewsFeed, create, like, unlike, remove, comment, uncomment
}

