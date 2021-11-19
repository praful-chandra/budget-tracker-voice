import React from "react";
import { Grid } from "@material-ui/core";

import {PushToTalkButton, PushToTalkButtonContainer,ErrorPanel} from "@speechly/react-ui";

import Details from "./components/Details/Details";
import Main from "./components/main/Main";

import useStyles from "./styles";

const App = () => {
  const classes = useStyles();

  return (
    <>
    <Grid
      className={classes.grid}
      container
      spacing={0}
      alignItems="center"
      justify="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={3}>
        <Details title="Income" />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Main />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Details title="Expense" />
      </Grid>
    </Grid>

    <PushToTalkButtonContainer>
      <PushToTalkButton/>
      <ErrorPanel/>
    </PushToTalkButtonContainer>
    </>
  );
};

export default App;
