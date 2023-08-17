import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateNewFinancialRecordModal({
  isNewRecordModalOpen,
  setIsNewRecordModalOpen,
  onSubmit,
  company,
}) {
  const [newRecordState, setNewRecordState] = React.useState({
    data_period: 'annual',
    revenue: null,
    burn: null,
    gp_pct: null,
    gp_amount: null,
    ebitda: null,
    cash: null,
    ltv: null,
    cac: null,
    arpu: null,
    customer_count: null,
    next_fundraise: null,
  });

  React.useEffect(() => {

  }, [company])

  const handleModalClose = () => {
    setIsNewRecordModalOpen(false);
    setNewRecordState({
      data_period: 'annual',
      revenue: "",
      burn: "",
      gp_pct: "",
      gp_amount: "",
      ebitda: "",
      cash: "",
      ltv: "",
      cac: "",
      arpu: "",
      customer_count: "",
      next_fundraise: "",
    })
  }

  const handlePeriodChangeChange = (e) => {
    setNewRecordState({
      ...newRecordState,
      data_period: e.target.value
    })
  }

  const handleNumberInput = (e) => {
    const value = e.target.value;
    const regex = /^-?(\d+\.?\d*|\.\d+)?$/;

    if (value === "" || regex.test(value)) {
      setNewRecordState({
        ...newRecordState,
        [e.target.name]: e.target.value
      })
    } else {
      e.target.value = "";
    }
  }

  const handleDateInput = (e) => {
    let inputValue = e.target.value;
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

    // Remove any characters that are not digits or slashes
    inputValue = inputValue.replace(/[^\d/]/g, '');

    // Automatically add slashes after the month and day
    if (inputValue.length === 2 && inputValue.length !== 3) {
      inputValue += '/';
    }
    if (inputValue.length === 5 && inputValue.length !== 6) {
      inputValue += '/';
    }

    // Limit to "MM/DD/YYYY" format
    if (inputValue.length <= 10) {
      setNewRecordState({
        ...newRecordState,
        [e.target.name]: inputValue
      })
    }
  }

  return (
    <div>
      <Dialog
        open={isNewRecordModalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleModalClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ zIndex: 999 }}
      >
        <DialogTitle>Create new financial record for <span className="font-bold">{company?.company_name}</span></DialogTitle>
        <DialogContent>
          <InputLabel id="demo-simple-select-label">Period</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newRecordState.data_period}
            label="Period"
            onChange={handlePeriodChangeChange}
          >
            <MenuItem value={'annual'}>Annual</MenuItem>
            <MenuItem value={'quarter'}>Quarter</MenuItem>
            <MenuItem value={'month'}>Month</MenuItem>
          </Select>
          <br /><br />
          <TextField id="outlined-basic" label="Revenue" name="revenue" value={newRecordState.revenue} onChange={handleNumberInput} variant="outlined" />
          <TextField id="outlined-basic" label="Burn" name="burn" value={newRecordState.burn} onChange={handleNumberInput} variant="outlined" />
          <TextField id="outlined-basic" label="GP Amount" name="gp_amount" value={newRecordState.gp_amount} onChange={handleNumberInput} variant="outlined" />
          <TextField id="outlined-basic" label="GP PCT" name="gp_pct" value={newRecordState.gp_pct} onChange={handleNumberInput} variant="outlined" />
          <TextField id="outlined-basic" label="EBITDA" name="ebitda" value={newRecordState.ebitda} onChange={handleNumberInput} variant="outlined" />
          <TextField id="outlined-basic" label="Cash" name="cash" value={newRecordState.cash} onChange={handleNumberInput} variant="outlined" />
          <TextField id="outlined-basic" label="LTV" name="ltv" value={newRecordState.ltv} onChange={handleNumberInput} variant="outlined" />
          <TextField id="outlined-basic" label="CAC" name="cac" value={newRecordState.cac} onChange={handleNumberInput} variant="outlined" />
          <TextField id="outlined-basic" label="ARPU" name="arpu" value={newRecordState.arpu} onChange={handleNumberInput} variant="outlined" />
          <TextField id="outlined-basic" label="Customer Count" name="customer_count" value={newRecordState.customer_count} onChange={handleNumberInput} variant="outlined" />
          <br /><br />
          <TextField fullWidth id="outlined-basic" name="next_fundraise" value={newRecordState.next_fundraise} label="New Fundraise Date MM/DD/YYYY" onChange={handleDateInput} variant="outlined" />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={() => onSubmit(newRecordState)}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
