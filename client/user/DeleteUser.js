import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import auth from '../auth/auth-helper'
import { remove } from './api-user'
import { Redirect } from 'react-router-dom'

class DeleteUser extends Component {
  state = { redirect: false, open: false }


  clickButton = () => {
    this.setState({ open: true })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  deleteAccount = () => {
    const jwt = auth.isAuthenticated()
    remove({
      userId: this.props.userId
    }, { t: jwt.token }).then((data) => {
      auth.signout(() => console.log('deleted'));
      this.setState({ redirect: true })
    }).catch(err => console.log(err.response.data.error))
  }


  render() {
    const redirect = this.state.redirect
    if (redirect) {
      return <Redirect to='/' />
    }
    return (<span>
      <IconButton aria-label="Delete" onClick={this.clickButton}
        color="secondary">
        <DeleteIcon />
      </IconButton>
      <Dialog open={this.state.open} onClose={this.handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your account.
              </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="primary">
            Cancel
              </Button>
          <Button onClick={this.deleteAccount} color="secondary"
            autoFocus="autoFocus">
            Confirm
              </Button>
        </DialogActions>
      </Dialog>
    </span>)
  }
}

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired
}

export default DeleteUser