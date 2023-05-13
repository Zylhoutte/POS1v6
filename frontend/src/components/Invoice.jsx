import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Box, useTheme, Modal, Backdrop, Fade, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useReactToPrint } from 'react-to-print';
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Invoice = () => {
  const theme = useTheme();
  const componentRef = useRef();
  const dispatch = useDispatch();
  const [billsData, setBillsData, isLoading] = useState([]);
  

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



  const handleModalClose = () => {
    setOpen(false)
};

const handleModalOpen = (rowData) => {
    console.log("Opening modal for row:", rowData);
    setSelectedBill(rowData);
    setOpen(true);
  };
  


  
  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const {data} = await axios.get('/api/bills/getbills');
      const uniqueCustomers = new Set(data.map((bill) => bill.customerName));
      setTotalCustomers(uniqueCustomers.size);
      setBillsData(data);
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(data);

    } catch(error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(error);
    }
  };

  useEffect(() => {
      getAllBills();
  }, []);

  console.log("data", billsData);


  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "customerName",
      headerName: "Customers",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "subTotal",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `₱${Number(params.value).toFixed(2)}`,
    },
    {
        field: "Action",
        headerName: "Action",
        flex: 1,
        renderCell: (params) => (
          <Button variant="contained" onClick={() => handleModalOpen(params.row)}>
            View
          </Button>
        ),
      },
  ];

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Invoice" subtitle="Entire list of transactions" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
        
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}   
      >

        <DataGrid
          loading={isLoading || !billsData}
          getRowId={(row) => row._id}
          rows={billsData || []}
          columns={columns}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage)}
          components={{ Toolbar: DataGridCustomToolbar }}
        />
      </Box>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="card" ref={componentRef}>
            <div className="cardHeader">
                <h2 className="logo">Invoice</h2>
                <span>Number: <b></b></span>
                <span>Address: <b></b></span>
            </div>
            <div className="cardBody">
                <div className="group">
                    <span>Customer Name:</span>
                    <span><b>{selectedBill?.customerName}</b></span>
                </div>
                <div className="group">
                    <span>Customer Phone:</span>
                    <span><b>{selectedBill?.customerPhone}</b></span>
                </div>
                <div className="group">
                    <span>Customer Address:</span>
                    <span><b>{selectedBill?.customerAddress}</b></span>
                </div>
                <div className="group">
                    <span>Date Order:</span>
                    <span><b>{selectedBill?.createdAt.toString().substring(0, 10)}</b></span>
                </div>
                <div className="group">
                    <span>Total Amount:</span>
                    <span><b>₱{selectedBill?.totalAmount}</b></span>
                </div>
            </div>
            <div className="cardFooter">
                <h4>Your Order</h4>
                {selectedBill && selectedBill.cartItems && selectedBill.cartItems.map((product) => (
                <React.Fragment key={product.id}>
                <div className="footerCard">
                 <div className="group">
                 <span>Product:</span>
                 <span><b>{product.name}</b></span>
                 </div>
                 <div className="group">
                 <span>Qty:</span>
                 <span><b>{product.quantity}</b></span>
                </div>
               <div className="group">
                <span>Price:</span>
               <span><b>₱{product.price}</b></span>
               </div>
               </div>
              </React.Fragment>
               ))}
                <div className="footerCardTotal">
                    <div className="group">
                        <h3>Total:</h3>
                        <h3><b>${selectedBill?.totalAmount}</b></h3>
                    </div>
                </div>
                <div className="footerThanks">
                    <span>Thank You for buying from us</span>
                </div>
            </div>
          </div>
          <div className="bills-btn-add">
            <Button variant="contained"onClick={handlePrint} htmlType='submit' className='add-new'>Generate Invoice</Button>
        </div>  
     
        </Box>
      </Modal>
      

    </Box>
  );
};

export default Invoice;
