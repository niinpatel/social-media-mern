import React, {Component} from 'react';
import {Route, Switch, Link} from 'react-router-dom'
import Home from './Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './Menu'


class MainRouter extends Component {

      // Removes the server-side injected CSS when React component mounts
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

    render() {
        return (
            <div>
                <Menu/>
                <Switch>
                    <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>   
                    <Route exact path="/" component={Home}/>
                    <Route path="/users" component={Users}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/signin" component={Signin}/>
                    <Route path="/user/:userId" component={Profile}/>
                </Switch>                
            </div>
        );
    }
}

export default MainRouter;
