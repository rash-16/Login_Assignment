import React, { Component } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Link } from '@material-ui/core';
import styles from './Login.css'
import cx from 'classnames';

export default class FormDataComponent extends Component {
    userData;

    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            email: null,
            password: null,
            errors: null,
            isSignUp: false,
           
        };
    }

    // Form Values


    onChangeEmail(e) {
        this.setState({ email: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }
    onSignUp() {
        this.setState({ isSignUp: true })
    }

    // React Life Cycle
    componentDidMount() {
        this.userData = JSON.parse(localStorage.getItem('user'));

        if (localStorage.getItem('user')) {
            this.setState({
                name: this.userData.name,
                email: this.userData.email,
                password: this.userData.password
            })
        } else {
            this.setState({
                email: '',
                password: ''
            })
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('user', JSON.stringify(nextState));
    }

    onSubmit(e) {
        e.preventDefault()
    }
   
    render() {
        return (
            <div className={styles.container}>
                <Grid container spacing={3} justify="center">
                    <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.login)}>
                        <CardContent>
                            <Typography variant="h5" style={{ marginBottom: 10 }}>
                                Login
                            </Typography>
                            <form onSubmit={this.onSubmit}>
                                <TextField
                                    variant="standard"
                                    placeholder="Email"
                                    margin="normal"
                                    required
                                    type="email"
                                    onChange={this.onChangeEmail}
                                    value={this.state.email}
                                />
                                <TextField
                                    variant="standard"
                                    placeholder="Password"
                                    margin="normal"
                                    required
                                    type="password"
                                    onChange={this.onChangePassword}
                                    value={this.state.password}
                                    errorMessages={['this field is required']}

                                />
                                <div>
                                    <button type="submit" className="btn btn-primary btn-block" >Login</button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="password" variant="body2">
                                                Forgot password?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link href="signUp" variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </div>
                            </form>
                        </CardContent>
                    </Grid>
                </Grid>
            </div>


        )
    }
}
