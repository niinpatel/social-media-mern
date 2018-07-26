import React, { Component } from 'react'
import { withStyles } from 'material-ui';
import PropTypes from 'prop-types'
import { listNewsFeed } from './api-post';
import auth from '../auth/auth-helper'
import Card from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import PostList from './PostList'
import NewPost from './NewPost'

const styles = theme => ({
    card: {
        margin: 'auto',
        paddingTop: 0,
        paddingBottom: theme.spacing.unit * 3
    },
    title: {
        padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2}px`,
        color: theme.palette.openTitle,
        fontSize: '1em'
    },
    media: {
        minHeight: 330
    }
})


class Newsfeed extends Component {
    state = {
        posts: [],
        error: ''
    }

    componentDidMount() {
        // get list of posts by calling api
        const jwt = auth.isAuthenticated()
        if (jwt)
            listNewsFeed({ userId: jwt.user._id}, {t: jwt.token })
                .then(data => {                    
                    this.setState({
                        posts: data
                    })
                })
                .catch(err => this.setState({ error: err.response.data.error }))
    }

    addPost = (post) => {
        this.setState({
            posts: [post, ...this.state.posts]
        })
    }

    removePost = (post) => {
        this.setState({
            posts: this.state.posts.splice(this.state.posts.indexOf(post), 1)
        })
    }

    render() {
        return (
        <Card>
            <Typography type="title"> Newsfeed </Typography>
            <Divider />
            <NewPost addUpdate={this.addPost} />
            <Divider />
            <PostList removeUpdate={this.removePost} posts={this.state.posts} />
        </Card>)
    }

}

Newsfeed.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Newsfeed) 