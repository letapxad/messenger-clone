import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import Bubble from './Bubble';

import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";

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
      padding: theme.spacing(2),
    },
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
  btnRegister: {
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
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
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
              <Typography className={classes.subText}>Don't have an account?</Typography>
              <Box mr={3} />
              <Button onClick={() => history.push("/register")} variant="contained" size="large" className={`${classes.btnRegister} ${classes.btn}`}>Create account</Button>
            </Grid>
            <Grid className={classes.form}>
              <form onSubmit={handleLogin}>
                <Grid container spacing={3} >
                  <Grid item xs={12}>
                    <Typography className={classes.welcomeMessage}>Welcome back!</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth margin="normal" required>
                      <TextField
                        required
                        aria-label="username"
                        label="Username"
                        name="username"
                        type="text"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth margin="normal" required>
                      <TextField
                        required
                        label="Password"
                        aria-label="password"
                        type="password"
                        name="password"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item container xs={12} justify="center">
                    <Button type="submit" variant="contained" size="large" color="primary" className={classes.btn}>
                      Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
