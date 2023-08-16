import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateNewCompanyModal({ open, setOpen, industries, businessModels, setCompanies }) {
  const theme = useTheme();
  const [selectedIndustries, setSelectedIndustries] = React.useState([]);
  const [selectedBusinessModels, setSelectedBusinessModels] = React.useState([]);
  const [newCompanyState, setNewCompanyState] = React.useState({
    name: '',
    city: '',
    country: '',
    companyLogoLink: ''
  });
  const [showBackdrop, setShowBackdrop] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setNewCompanyState({
      name: '',
      city: '',
      country: '',
      companyLogoLink: ''
    });
    setSelectedBusinessModels([]);
    setSelectedIndustries([]);
  };

  const handleIndustryChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedIndustries(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleBusinessModelChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedBusinessModels(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleTextInputChange = (event) => {
    setNewCompanyState({
      ...newCompanyState,
      [event.target.name]: event.target.value
    })
  };

  const handleNewCompanySubmitted = () => {
    const newCompany = {
      ...newCompanyState,
      industries: selectedIndustries,
      business_models: selectedBusinessModels
    }
    setShowBackdrop(true);
    axios.post('http://localhost:3000/companies', {new_company: newCompany})
      .then(response => {
        if(response.data.status === 'failed') {
          alert(response.data.errors[0])
        } else {
          setCompanies(response.data);
          handleClose();
        }
        setShowBackdrop(false);
      })
      .catch(err => {
        alert(err.message)
        setShowBackdrop(false);
      })
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Create New Company</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <p>name</p>
            <hr />
            <br />
            <TextField onChange={handleTextInputChange} value={newCompanyState.name} id="outlined-basic" label="Company Name" name="name" variant="outlined" required />
            <br /><br />
            <InputLabel id="demo-multiple-chip-label">Select Industries</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={selectedIndustries}
              onChange={handleIndustryChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {industries.map((industry) => (
                <MenuItem
                  key={industry.name}
                  value={industry.name}
                  style={getStyles(industry.name, selectedIndustries, theme)}
                >
                  {industry.name}
                </MenuItem>
              ))}
            </Select>
            
            <br /><br />
            <InputLabel id="demo-multiple-chip-label">Select Business Models</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={selectedBusinessModels}
              onChange={handleBusinessModelChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {businessModels.map((industry) => (
                <MenuItem
                  key={industry.name}
                  value={industry.name}
                  style={getStyles(industry.name, selectedIndustries, theme)}
                >
                  {industry.name}
                </MenuItem>
              ))}
            </Select>

            <hr />
            <br />
            <TextField value={newCompanyState.city} onChange={handleTextInputChange} id="outlined-basic" label="City" name="city" variant="outlined" required />
            <TextField value={newCompanyState.country} onChange={handleTextInputChange} id="outlined-basic" label="Country" name="country" variant="outlined" required />
            <hr />
            <br />
            <p>misc.</p>
            <TextField value={newCompanyState.companyLogoLink} onChange={handleTextInputChange} id="outlined-basic" label="Company Logo Link" name="companyLogoLink" variant="outlined" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: 'red' }}>cancel</Button>
          <Button onClick={handleNewCompanySubmitted} style={{ color: 'green' }}>Create</Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: '#fff', zIndex: 999999 }}
        open={showBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
