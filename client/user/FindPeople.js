import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import { Link } from 'react-router-dom'
import { findPeople, follow } from './api-user.js'
import auth from './../auth/auth-helper'
import Snackbar from 'material-ui/Snackbar'
import ViewIcon from 'material-ui-icons/Visibility'

const styles = theme => ({
    root: theme.mixins.gutters({
        padding: theme.spacing.unit,
        margin: 0
    }),
    title: {
        margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
        color: theme.palette.openTitle,
        fontSize: '1em'
    },
    avatar: {
        marginRight: theme.spacing.unit * 1
    },
    follow: {
        right: theme.spacing.unit * 2
    },
    snack: {
        color: theme.palette.protectedTitle
    },
    viewButton: {
        verticalAlign: 'middle'
    }
})


class FindPeople extends Component {
    state = {
        users: [],
        open: false,
        error: '',
        followMessage: ''
    }


    clickFollow = (user) => {
        const jwt = auth.isAuthenticated()
        follow({
            userId: jwt.user._id
        }, { t: jwt.token }, user._id)
            .then(data => {
                let toFollow = this.state.users.filter(_ => _._id !== user._id)
                this.setState({
                    users: toFollow,
                    open: true,
                    followMessage: `Following ${user.name}`
                })
            })
            .catch(console.log)
    }


    componentDidMount = () => {
        const jwt = auth.isAuthenticated()
        if(jwt)
            findPeople({ userId: jwt.user._id }, { t: jwt.token })
                .then(data => {
                    this.setState({
                        users: data
                    })
                }).catch(err => console.log(err.response.data.error))
    }

    handleRequestClose = () => {
        this.setState({
            open: false
        })
    }
    render() {
        let { classes } = this.props
        return (
            <List>{this.state.users.map((item, i) => {
                return <span key={i}>
                    <ListItem>
                        <ListItemAvatar className={classes.avatar}>
                            <Avatar src={'/api/users/photo/' + item._id} />
                        </ListItemAvatar>
                        <ListItemText primary={item.name} />
                        <ListItemSecondaryAction className={classes.follow}>
                            <Link to={"/user/" + item._id}>
                                <IconButton variant="raised" color="secondary"
                                    className={classes.viewButton}>
                                    <ViewIcon />
                                </IconButton>
                            </Link>
                            <Button aria-label="Follow" variant="raised"
                                color="primary"
                                onClick={this.clickFollow.bind(this, item)}>
                                Follow
                        </Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        open={this.state.open}
                        onClose={this.handleRequestClose}
                        autoHideDuration={6000}
                        message={<span className={classes.snack}>{this.state.followMessage}</span>}
                    />
                </span>
            })
            }
            </List>
        )
    }
}

FindPeople.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FindPeople)