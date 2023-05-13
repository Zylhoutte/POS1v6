import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, useTheme, Modal, Backdrop, Fade, Button,Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AddProductDialog from 'components/AddProductDialog'



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Storage = () => {
const theme = useTheme();
  const dispatch = useDispatch();
  const [productData, setProductData,isLoading] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [popModal, setPopModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editProduct, setEditProduct] = useState(false);
  

  const getAllProducts = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const {data} = await axios.get('/api/products/getproducts');
      setProductData(data);
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
      getAllProducts();
  }, []);

  const handlerDelete = async (record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post('/api/products/deleteproducts', {productId:record._id});
      toast.success("Product Deleted Successfully!")
      getAllProducts();
      setPopModal(false);
      dispatch({
        type: "HIDE_LOADING",
      });
      

    } catch(error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      toast.error("Error!")
      console.log(error);
    }
  }

  const columns = [
    {
        field: "name",
        headerName: "Name",
        flex: 1,
    },
    {
        flex: 1,
        render:(image, record) => <img src={image} alt={record.name} height={60} width={60} />
    }, 
    {
        field: "brand",
        headerName: "Brand",
        flex: 1,
    },
    {
        field: "Category",
        headerName: "Category",
        flex: 1,
    },
    {
        field: "cost",
        headerName: "Cost",
        flex: 1,
    },
    {
        field: "profit",
        headerName: "Profit",
        flex: 1,
    },
    {
        field: "price",
        headerName: "Price",
        flex: 1,
    },
    {
        field: "quantity",
        headerName: "Quantity",
        flex: 1,
    },
    
    
  ]

  const handlerSubmit = async (value) => {
    //console.log(value);
    if(editProduct === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const res = await axios.post('/api/products/addproducts', value);
        toast.success("Product Added Successfully!")
        getAllProducts();
        setPopModal(false);
        dispatch({
          type: "HIDE_LOADING",
        });
        
  
      } catch(error) {
        dispatch({
          type: "HIDE_LOADING",
        });
        toast.error("Error!")
        console.log(error);
      }
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
       await axios.put('/api/products/updateproducts', {...value, productId:editProduct._id});
       toast.success("Product Updated Successfully!")
        getAllProducts();
        setPopModal(false);
        dispatch({
          type: "HIDE_LOADING",
        });
        
  
      } catch(error) {
        dispatch({
          type: "HIDE_LOADING",
        });
        toast.error("Error!")
        console.log(error);
      }
    }
  }


  return (
    <Box m="1.5rem 2.5rem">
    <Header title="Inventory" subtitle="Product List" />
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
   

    
      <h2>All Products </h2>
      <TableContainer>
  <Table>
  <TableHead>
  <TableRow>
    <TableCell>Product Name</TableCell>
    <TableCell>Price</TableCell>
    <TableCell>Cost</TableCell>
    <TableCell>Profit</TableCell>
    <TableCell>Quantity</TableCell>
    <TableCell>Action</TableCell>
  </TableRow>
</TableHead>
    <TableBody>
    {productData.map((record) => (
  <TableRow key={record.id}>
    <TableCell>{record.name}</TableCell>
    <TableCell>₱{record.price}</TableCell>
    <TableCell>₱{record.cost}</TableCell>
    <TableCell>{record.profit}%</TableCell>
    <TableCell>{record.quantity}</TableCell>
    <TableCell>
      <div>
        <DeleteOutlineOutlinedIcon className='cart-action' onClick={() => handlerDelete(record)}/>
      </div>
    </TableCell>
  </TableRow>
))}
    </TableBody>
  </Table>
</TableContainer>
<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <AddProductDialog/>
          </Typography>
        </Box>
      </Modal>
      <Button variant='contained' onClick={handleOpen}>Add Product</Button>
      </Box>
      </Box>
    
  
   
  )
}

export default Storage