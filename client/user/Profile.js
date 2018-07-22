import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles';
import auth from '../auth/auth-helper'
import { read } from './api-user'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import List, {ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from 'material-ui/List'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import Person from 'material-ui-icons/Person'
import { Link } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui-icons/Edit'
import DeleteUser from './DeleteUser'


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
    constructor({match}){
        super()

        this.state = {
            user: '',
            redirectToSignin: false
        }
        this.match = match
    }

    init = (userId) => {
        const jwt = auth.isAuthenticated()
        read({userId: userId}, {t: jwt.token}).then(data => {
            this.setState({
                user: data
            })
        }).catch(err => this.setState({redirectToSignin: true}))
    }

    componentDidMount = () => {
        this.init(this.match.params.userId)
    }
    
    componentWillReceiveProps = (props) => {
        this.init(props.match.params.userId)
    }

    render(){
        const {classes} = this.props
        const {redirectToSignin} = this.state
        if(redirectToSignin)
            return <Redirect to='/signin/'/>
        return (
            <div>
  <Paper className={classes.root} elevation={4}>
    <Typography type="title" className={classes.title}> Profile </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
             <Avatar>
               <Person/>
             </Avatar>
          </ListItemAvatar>
          <ListItemText primary={this.state.user.name} 
                       secondary={this.state.user.email}/>
        { auth.isAuthenticated().user && auth.isAuthenticated().user._id == this.state.user._id &&
    (<ListItemSecondaryAction>
       <Link to={"/user/edit/" + this.state.user._id}>
         <IconButton color="primary">
           <Edit/>
         </IconButton>
       </Link>
       <DeleteUser userId={this.state.user._id}/>
    </ListItemSecondaryAction>)}
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemText primary={"Joined: " + 
              (new Date(this.state.user.created)).toDateString()}/>
        </ListItem>
      </List>
  </Paper>
</div>
        )


    }

}

Profile.propTypes = {
    classes: PropTypes.object.isRequired
}
  
export default withStyles(styles)(Profile)
  