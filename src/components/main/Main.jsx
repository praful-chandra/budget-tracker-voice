import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";

import Form from './Form/Form';
import List from './List/List';

import useStyles from "./styles";

const Main = () => {
  const classes = useStyles()

  return (
    <Card
     className={classes.root}
    >
      <CardHeader title="Expense Tracker" />
      <CardContent>
        <Typography align="center" variant="h5">
          Total Balance Rs.1000
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ lineHeight: "1.5em", marginTop: "20px" }}
        >
          {/* Info card component */}
          Try saying: ADD INCOME FOR 100RS IN CATEGORY BILL FOR MONDAY
        </Typography>
        <Divider />
        {/* Form component */}
        <Form />
      </CardContent>

      <CardContent
      className={classes.cardContent}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* <List /> */}
            <List />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Main;
