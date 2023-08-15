import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CompanyModal({ viewCompanyDetailsModal, setViewCompanyDetailsModal }) {

  React.useEffect(() => {

  }, [viewCompanyDetailsModal.item]);
  
  const handleClose = () => {
    setViewCompanyDetailsModal({ open: false, item: null });
  };

  const annualize = (data) => {
    if (!data) return null;

    return data.map(item => {
      let multiplier;
        
      switch(item.data_period) {
          case 'month':
              multiplier = 12;
              break;
          case 'quarter':
              multiplier = 4;
              break;
          default:  // 'annual' or any other unexpected value
              multiplier = 1;
      }
      
      return {
          ...item,
          revenue: item.revenue ? (parseFloat(item.revenue) * multiplier).toFixed(2) : null,
          burn: item.burn ? (parseFloat(item.burn) * multiplier).toFixed(2) : null,
          gp_pct: item.gp_pct ? parseFloat(item.gp_pct).toFixed(2) : null,  // percentage; no change
          gp_amount: item.gp_amount ? (parseFloat(item.gp_amount) * multiplier).toFixed(2) : null,
          ebitda: item.ebitda ? (parseFloat(item.ebitda) * multiplier).toFixed(2) : null,
          cash: item.cash ? (parseFloat(item.cash) * multiplier).toFixed(2) : null,
          ltv: item.ltv ? (parseFloat(item.ltv) * multiplier).toFixed(2) : null,
          cac: item.cac ? (parseFloat(item.cac) * multiplier).toFixed(2) : null,
          arpu: item.arpu ? (parseFloat(item.arpu) * multiplier).toFixed(2) : null,
          customer_count: item.customer_count ? (parseFloat(item.customer_count) * multiplier).toFixed(0) : null,
          data_period: 'annual'
      };
    });
}

  const annualizedData = annualize(viewCompanyDetailsModal?.item?.financial_data);

  const handleAddNewRecord = () => {

  }

  return (
    <div>
      <Dialog
        fullScreen
        open={viewCompanyDetailsModal.open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {viewCompanyDetailsModal?.item?.company_name}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <div className="flex flex-col ">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">Entry Date</th>
                        <th scope="col" className="px-6 py-4">Period</th>
                        <th scope="col" className="px-6 py-4">Revenue</th>
                        <th scope="col" className="px-6 py-4">GP PCT</th>
                        <th scope="col" className="px-6 py-4">GP Amount</th>
                        <th scope="col" className="px-6 py-4">EBITDA</th>
                        <th scope="col" className="px-6 py-4">LTV</th>
                        <th scope="col" className="px-6 py-4">CAC</th>
                        <th scope="col" className="px-6 py-4">ARPU</th>
                        <th scope="col" className="px-6 py-4">Customer Count</th>
                        <th scope="col" className="px-6 py-4">Next Fund Raise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                       annualizedData?.map(data => {
                          return(
                            <tr className="border-b dark:border-neutral-500">
                              <td className="whitespace-nowrap px-6 py-4">{data.created_at ? new Date(data.created_at).toDateString() : ""}</td>
                              <td className="whitespace-nowrap px-6 py-4">{data.data_period}</td>
                              <td className="whitespace-nowrap px-6 py-4 font-bold">{data.revenue}</td>
                              <td className="whitespace-nowrap px-6 py-4">{data.gp_pct}</td>
                              <td className="whitespace-nowrap px-6 py-4">{data.gp_amount}</td>
                              <td className="whitespace-nowrap px-6 py-4">{data.ebitda}</td>
                              <td className="whitespace-nowrap px-6 py-4">{data.ltv}</td>
                              <td className="whitespace-nowrap px-6 py-4">{data.cac}</td>
                              <td className="whitespace-nowrap px-6 py-4">{data.arpu}</td>
                              <td className="whitespace-nowrap px-6 py-4">{data.customer_count}</td>
                              <td className="whitespace-nowrap px-6 py-4">{data.next_fundraise ? new Date(data.next_fundraise).toDateString() : ""}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                  <div className="flex justify-center pt-6">
                    <button onClick={handleAddNewRecord} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add New Record</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </List>
      </Dialog>
    </div>
  );
}
