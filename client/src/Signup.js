import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Bubble from './Bubble';

import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  makeStyles,
  Paper
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  paper: {
    margin: '5% auto auto auto',
    maxWidth: "900px",
    [theme.breakpoints.between('xs', 'sm')]: {
      margin: '2%',
    },
  },
  image: {
    backgroundImage: `linear-gradient(to bottom, rgba(58, 141, 255, 0.6), rgba(134, 185, 255, 1)), url("/images/bg-img.png")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "700px",
    minWidth: "300px",
    width: "auto",
    opacity: "85%",
    [theme.breakpoints.between('xs', 'sm')]: {
      minHeight: "15px",
      minWidth: "100%",
      padding: "5%"
    },
  },
  headline: {
    padding: theme.spacing(3),
    [theme.breakpoints.between('xs', 'sm')]: {
      padding: theme.spacing(1),
    }
  },
  form: {
    padding: theme.spacing(3),
    margin: "0 5% 0 5%",
    [theme.breakpoints.between('sm', 'md')]: {
      margin: "0 15% 0 15%",
    },
    [theme.breakpoints.up('lg')]: {
      margin: "0 12% 0 12%",
    },
  },
  btn: {
    width: "150px",
    height: "45px",
    fontSize: "0.85rem"
  },
  btnLogin: {
    color: "#3A8DFF",
    backgroundColor: "#FFFFFF",
  },
  subText: {
    fontSize: "0.8rem",
    color: "#a5a5a5"
  },
  welcomeMessage: {
    fontSize: 22,
    fontWeight: "bold"
  },
  tagLine: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "light"
  },
  bubble: {
    textAlign: "center"
  }

}));

const Login = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item container md={5} className={classes.image} justify="center" alignItems="center" alignContent="center">
            <Grid item xs={12} className={classes.bubble}>
              <Bubble />
            </Grid>
            <Grid item>
              <Typography className={classes.tagLine}>Converse with anyone</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.tagLine}>with any language</Typography>
            </Grid>
          </Grid>
          <Grid item md={7} xs={12}>
            <Grid container item xs={12} justify="flex-end" alignItems="center" className={classes.headline}>
              <Typography className={classes.subText}>Already have an account?</Typography>
              <Box mr={3} />
              <Button onClick={() => history.push("/login")} variant="contained" size="large" className={`${classes.btnLogin} ${classes.btn}`}>Login</Button>
            </Grid>
            <Grid className={classes.form}>
              <form onSubmit={handleRegister}>
                <Grid container spacing={3} >
                  <Grid item xs={12}>
                    <Typography className={classes.welcomeMessage}>Create an account.</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth margin="normal" required>
                      <TextField
                        aria-label="username"
                        label="Username"
                        name="username"
                        type="text"
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth margin="normal" required>
                      <TextField
                        label="E-mail address"
                        aria-label="e-mail address"
                        type="email"
                        name="email"
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl error={!!formErrorMessage.confirmPassword} fullWidth margin="normal" required>
                      <TextField
                        aria-label="password"
                        label="Password"
                        type="password"
                        inputProps={{ minLength: 6 }}
                        name="password"
                        required
                      />
                      <FormHelperText>
                        {formErrorMessage.confirmPassword}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl error={!!formErrorMessage.confirmPassword} fullWidth margin="normal" required>
                      <TextField
                        label="Confirm Password"
                        aria-label="confirm password"
                        type="password"
                        inputProps={{ minLength: 6 }}
                        name="confirmPassword"
                        required
                      />
                      <FormHelperText>
                        {formErrorMessage.confirmPassword}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item container xs={12} justify="center">
                    <Button type="submit" variant="contained" size="large" color="primary" className={classes.btn}>
                      Create
            </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
