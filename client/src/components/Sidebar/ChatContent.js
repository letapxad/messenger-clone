import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
    alignContent: "space-around"
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  boldPreviewText: {
    fontSize: 12,
    color: "#000000",
    letterSpacing: -0.17,
    fontWeight: "bolder"
  },
  notification: {
    height: 20,
    width: 20,
    backgroundColor: "#3F92FF",
    marginRight: 10,
    color: "white",
    fontSize: 10,
    letterSpacing: -0.5,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser, unreadCount } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Box className={classes.content}>
          <Typography className={unreadCount > 0 ? classes.boldPreviewText : classes.previewText}>
            {latestMessageText}
          </Typography>
          {unreadCount > 0 && <Typography className={classes.notification}>{unreadCount}</Typography>}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatContent;
