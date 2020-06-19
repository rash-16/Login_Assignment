import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import './SignUp.css';
import { CardContent, Typography, Grid, TextField, Link } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from 'react-router-dom';


const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
export default class SignUp extends Component {
    userData;

    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            open: false,
            navigate: false,
            referrer: "/SignUp",
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            userName: null,
            formErrors: {
                email: "",
                password: ""
            }

        };
    }
    // React Life Cycle
    componentDidMount() {
        this.userData = JSON.parse(localStorage.getItem('user'));

        if (localStorage.getItem('user')) {
            this.setState({
                firstName: this.userData.firstName,
                lastName: this.userData.lastName,
                userName: this.userData.userName,
                email: this.userData.email,
                password: this.userData.password
            })
        } else {
            this.setState({
                firstName: '',
                lastName: '',
                userName: '',
                email: '',
                password: ''
            })
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('user', JSON.stringify(nextState));
    }
    onChangeFirstName(e) {
        this.setState({ firstName: e.target.value })
    }

    onChangeLastName(e) {
        this.setState({ lastName: e.target.value })
    }
    onChangeUserName(e) {
        this.setState({ userName: e.target.value })
    }
    onChangeEmail(e) {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        // this.setState({ email: e.target.value })
        formErrors.email = emailRegex.test(value)
        ? ""
        : "invalid email address";
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));

    }

    onChangePassword(e) {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        formErrors.password = value.length < 6 ? "minimum 6 characaters required" : "";
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));

    }
    handleOpen() {
        this.setState({
            open: true
        },
            () => {
                setTimeout(() => {
                    this.setState({ open: false })
                }, 5000);//5 Second delay   
            }
        );
        setTimeout(() => {
            this.setState({ navigate: true });
            this.setState({ referrer: '/profile' });
        }, 5000);


    }

    handleClose() {
        this.setState({ open: false });
        this.setState({ navigate: true });
        this.setState({ referrer: '/profile' });
    }


    render() {
        const { formErrors } = this.state;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="paper">
                    <CardContent>
                        <Avatar className="avatar">
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <form className="avatar" validate>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onChange={this.onChangeFirstName}
                                        value={this.state.firstName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                        onChange={this.onChangeLastName}
                                        value={this.state.lastName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={this.onChangeEmail}
                                        value={this.state.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="username"
                                        label="Username"
                                        type="username"
                                        id="username"
                                        autoComplete="username"
                                        onChange={this.onChangeUserName}
                                        value={this.state.userName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={this.onChangePassword}
                                        value={this.state.password}
                                    />
                                </Grid>
                                {formErrors.password.length > 0 && (
                                    <span className="errorMessage">{formErrors.password}</span>
                                )}
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="avatar"
                                component={Link} to="/profile"
                                onClick={this.handleOpen}
                            >
                                Sign Up
                            </Button>
                            <Dialog
                                aria-labelledby="simple-dialog-title" open={this.state.open ? true : false} model={false} onClose={this.handleClose}>
                                <DialogTitle id="simple-dialog-title">Thankyou for Registering</DialogTitle>
                            </Dialog>
                            <Redirect to={this.state.referrer}></Redirect>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="/" variant="body2">
                                        Already have an account? Sign in
                            </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </div>
            </Container>
            
        );
    }
}
