import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import seashellImg from './../assets/images/seashell.jpg'
import NewsFeed from './post/NewsFeed';
import auth from './auth/auth-helper';
import FindPeople from './user/FindPeople';

const styles = theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing.unit * 5
    },
    title: {
        padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px 
    ${theme.spacing.unit * 2}px`,
        color: theme.palette.text.secondary
    },
    media: {
        minHeight: 330
    }
})

class Home extends Component {
    state = {
        loggedIn: false
    }

    componentDidMount() {
        const jwt = auth.isAuthenticated()
        if (jwt) {
            this.setState({
                loggedIn: true
            })
        }
    }
    render() {
        const { classes } = this.props
        return (
            <div>{this.state.loggedIn ?
                (
                    <div>
                        <NewsFeed />
                    </div>
                ) : (
                    <Card className={classes.card}>
                        <Typography type="headline" component="h2" className=
                            {classes.title}>
                            Home Page
                        </Typography>
                        <CardMedia className={classes.media} image={seashellImg}
                            title="Unicorn Shells" />
                        <CardContent>
                        <Typography type="body1" component="p">
                                Welcome to the Mern Skeleton home page
                        </Typography>
                        </CardContent>
                    </Card>
                )}
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home)
