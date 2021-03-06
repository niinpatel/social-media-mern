import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import List, { ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import ArrowForward from 'material-ui-icons/ArrowForward'
import { Link } from 'react-router-dom'
import { list } from './api-user.js'

const styles = theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing.unit,
    margin: theme.spacing.unit * 5
  }),
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    color: theme.palette.openTitle
  }
})


class Users extends Component {

  constructor(props) {
    super(props)

    this.state = {
      users: []
    }
  }



  componentDidMount() {

    list().then(data => {
      this.setState({
        users: data
      })
    }
    ).catch(err => console.log(err.response.data.error))
  }

  render() {
    const { classes } = this.props

    return (
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          All Users
            </Typography>
        <List dense>
          {this.state.users.map(function (item, i) {
            return <Link to={"/user/" + item._id} key={i}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={`/api/users/photo/${item._id}`} />
                </ListItemAvatar>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <IconButton>
                    <ArrowForward />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          })}
        </List>
      </Paper>



    )
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired
}


export default (withStyles)(styles)(Users)
