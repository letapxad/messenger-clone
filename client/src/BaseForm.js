import React from "react";
import { useHistory } from "react-router-dom";
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
      margin: '0%',
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
    fontSize: theme.typography.fontSize
  },
  btnChangeForm: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.main,
  },
  subText: {
    fontSize: theme.typography.fontSize,
    color: theme.palette.subText.main
  },
  welcomeMessage: {
    fontSize: theme.typography.prompt.fontSize,
    fontWeight: "bold"
  },
  tagLine: {
    color: theme.palette.background.main,
    fontSize: theme.typography.prompt.fontSize,
    fontWeight: "light"
  },
  bubble: {
    textAlign: "center"
  }
}));


const BaseForm = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { isLoginForm, handleAction, formErrorMessage } = props;

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
              {isLoginForm && <Typography className={classes.subText}>Already have an account?</Typography>}
              {!isLoginForm && <Typography className={classes.subText}>Don't have an account?</Typography>}
              <Box mr={3} />
              {isLoginForm && <Button onClick={() => history.push("/register")} variant="contained" size="large" className={`${classes.btnChangeForm} ${classes.btn}`}>Create account</Button>}
              {!isLoginForm && <Button onClick={() => history.push("/login")} variant="contained" size="large" className={`${classes.btnChangeForm} ${classes.btn}`}>Login</Button>}
            </Grid>
            <Grid className={classes.form}>
              <form onSubmit={handleAction}>
                <Grid container spacing={3} >
                  <Grid item xs={12}>
                    {isLoginForm && <Typography className={classes.welcomeMessage}>Welcome back!</Typography>}
                    {!isLoginForm && <Typography className={classes.welcomeMessage}>Create an account.</Typography>}
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
                  {isLoginForm && <Grid item xs={12}>
                    <FormControl fullWidth margin="normal" required>
                      <TextField
                        required
                        label="Password"
                        aria-label="password"
                        type="password"
                        name="password"
                      />
                    </FormControl>
                  </Grid>}
                  {!isLoginForm && <Grid item xs={12}>
                    <FormControl fullWidth margin="normal" required>
                      <TextField
                        label="E-mail address"
                        aria-label="e-mail address"
                        type="email"
                        name="email"
                        required
                      />
                    </FormControl>
                  </Grid>}
                  {!isLoginForm && <Grid item xs={12}>
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
                  </Grid>}
                  {!isLoginForm && <Grid item xs={12}>
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
                  </Grid>}
                  <Grid item container xs={12} justify="center">
                    {isLoginForm && <Button type="submit" variant="contained" size="large" color="primary" className={classes.btn}>
                      Login
                        </Button>}
                    {!isLoginForm && <Button type="submit" variant="contained" size="large" color="primary" className={classes.btn}>
                      Create
                    </Button>}

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

export default BaseForm;