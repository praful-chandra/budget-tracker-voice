import React, { useState, useContext,useEffect } from "react";
import {
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import {useSpeechContext} from '@speechly/react-client'

import useStyles from "./styles";

import { ExpenseTrackerContext } from "../../../context/context";

import {
  incomeCategories,
  expenseCategories,
} from "../../../constants/categories";
import formatDate from "../../../utils/formatDate";

import CustomSnackbar from '../../Snackbar/Snackbar'

const initialState = {
  amount: "",
  category: "",
  type: "Income",
  date: formatDate(new Date()),
};

const Form = () => {
  const classes = useStyles();
  const {segment} = useSpeechContext();

  const [formData, setformData] = useState(initialState);
  const [open, setOpen] = React.useState(false);

  const { addTransaction } = useContext(ExpenseTrackerContext);

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === 'add_expense') {
        setformData({ ...formData, type: 'Expense' });
      } else if (segment.intent.intent === 'add_income') {
        setformData({ ...formData, type: 'Income' });
      } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
        return createTransaction();
      } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
        return setformData(initialState);
      }

      segment.entities.forEach((s) => {
        const category = `${s.value.charAt(0)}${s.value.slice(1).toLowerCase()}`;

        switch (s.type) {
          case 'amount':
            setformData({ ...formData, amount: s.value });
            break;
          case 'category':
            if (incomeCategories.map((iC) => iC.type).includes(category)) {
              setformData({ ...formData, type: 'Income', category });
            } else if (expenseCategories.map((iC) => iC.type).includes(category)) {
              setformData({ ...formData, type: 'Expense', category });
            }
            break;
          case 'date':
            setformData({ ...formData, date: s.value });
            break;
          default:
            break;
        }
      });

      if (segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
        createTransaction();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segment]);

  const createTransaction = () => {
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;

    if (incomeCategories.map((iC) => iC.type).includes(formData.category)) {
      setformData({ ...formData, type: 'Income' });
    } else if (expenseCategories.map((iC) => iC.type).includes(formData.category)) {
      setformData({ ...formData, type: 'Expense' });
    }

    setOpen(true);
    addTransaction({ ...formData, amount: Number(formData.amount), id: uuidv4() });
    setformData(initialState);
  };

  const selectedCategories =
    formData.type === "Income" ? incomeCategories : expenseCategories;


  return (
    <Grid container spacing={2}>
      <CustomSnackbar open={open} setOpen={setOpen} />
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom style={{color : '#4DD637', fontWeight: 'bolder'}}>
          {
            segment && (<>
              {segment.words.map(w=> w.value).join(" ")}
            </>)
          }
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => {
              setformData({ ...formData, type: e.target.value });
            }}
          >
             <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) => {
              setformData({ ...formData, category: e.target.value });
            }}
          >
           {
              selectedCategories.map(sc=>(
                <MenuItem key={sc.type} value={sc.type}>
                  {sc.type}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          fullWidth
          value={formData.amount}
          onChange={(e) => {
            setformData({ ...formData, amount: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="date"
          label="Date"
          fullWidth
          value={formData.date}
          onChange={(e) => {
            setformData({ ...formData, date: formatDate(e.target.value) });
          }}
        />
      </Grid>
      <Button
        className={classes.button}
        variant="outlined"
        fullWidth
        color="primary"
        onClick={createTransaction}
      >
        Create
      </Button>
    </Grid>
  );
};

export default Form;
