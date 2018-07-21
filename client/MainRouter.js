import React, {Component} from 'react';
import {Route, Switch, Link} from 'react-router-dom'
import Home from './Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'


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
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/users" component={Users}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/signin" component={Signin}/>
                </Switch>
                <Link to="/signup">Signup</Link>
                <Link to="/users">Users</Link>
                <Link to="/signin">Signin</Link>
            </div>
        );
    }
}

export default MainRouter;
