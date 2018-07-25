import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles';
import auth from '../auth/auth-helper'
import { read } from './api-user'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import List, { ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import { Link } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui-icons/Edit'
import DeleteUser from './DeleteUser'
import FollowProfileButton from './FollowProfileButton';
import FollowGrid from './FollowGrid';
import FindPeople from './FindPeople';


const styles = theme => ({
    root: theme.mixins.gutters({
        maxWidth: 600,
        margin: 'auto',
        padding: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 5
    }),
    title: {
        margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px 0`,
        color: theme.palette.protectedTitle,
        fontSize: '1em'
    },
    bigAvatar: {
        width: 60,
        height: 60,
        margin: 10
    }
})

class Profile extends Component {
    constructor({ match }) {
        super()

        this.state = {
            user: '',
            following: false,
            redirectToSignin: false
        }
        this.match = match
    }

    init = (userId) => {
        const jwt = auth.isAuthenticated()
        read({ userId: userId }, { t: jwt.token }).then(data => {
            let following = this.checkFollow(data)
            this.setState({
                user: data,
                following: following
            })
        }).catch(err => this.setState({ redirectToSignin: true }))
    }

    checkFollow = (user) => {
        const jwt = auth.isAuthenticated()
        let match = user.followers.filter(follower => follower._id == jwt.user._id)
        return match.length > 0
    }

    componentDidMount = () => {
        this.init(this.match.params.userId)

    }

    componentWillReceiveProps = (props) => {
        this.init(props.match.params.userId)
    }

    clickFollowButton = (callApi) => {
        const jwt = auth.isAuthenticated()
        callApi({
            userId: jwt.user._id
        }, { t: jwt.token }, this.state.user._id)
            .then(data => {
                this.setState({
                    user: data,
                    following: !this.state.following
                })
            })
            .catch(err => this.setState({ error: err.response.data.error }))
    }

    render() {
        const { classes } = this.props
        const { redirectToSignin } = this.state
        const photoUrl = this.state.user._id ? `/api/users/photo/${this.state.user._id}?${new Date().getTime()}` : '/api/users/defaultphoto'
        if (redirectToSignin)
            return <Redirect to='/signin/' />
        return (
            <div>
                <Paper className={classes.root} elevation={4}>
                    <Typography type="title" className={classes.title}> Profile </Typography>
                    <List dense>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar src={photoUrl} />
                            </ListItemAvatar>
                            <ListItemText primary={this.state.user.name}
                                secondary={this.state.user.email} />
                            {auth.isAuthenticated().user && auth.isAuthenticated().user._id == this.state.user._id ?
                                (<ListItemSecondaryAction>
                                    <Link to={"/user/edit/" + this.state.user._id}>
                                        <IconButton color="primary">
                                            <Edit />
                                        </IconButton>
                                    </Link>
                                    <DeleteUser userId={this.state.user._id} />
                                </ListItemSecondaryAction>) : (
                                    <FollowProfileButton following={this.state.following} onButtonClick={this.clickFollowButton} />
                                )}
                        </ListItem>
                        <Divider />
                        <ListItem> <ListItemText primary={this.state.user.about} /></ListItem>
                        <ListItem>
                            <ListItemText primary={"Joined: " +
                                (new Date(this.state.user.created)).toDateString()} />
                        </ListItem>
                    </List>
                    <FollowGrid people={this.state.user.followers || []} />
                    <FollowGrid people={this.state.user.following || []} />
                    <FindPeople />
                </Paper>
            </div>
        )


    }

}

Profile.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Profile)
