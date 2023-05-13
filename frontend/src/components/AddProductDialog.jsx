import { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    image: "",
    brand: "",
    category: "",
    description: "",
    cost: 0,
    profit: 0,
    quantity: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/api/products/addproducts", product);
      toast.success("Product added successfully!");
      setProduct({
        name: "",
        image: "",
        brand: "",
        category: "",
        description: "",
        cost: 0,
        profit: 1, // Set default value to 1
        quantity: 0,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error adding product!");
    }
  };
  

  return (
    <Container maxWidth="md">
         
      <Typography variant="h4" align="center" gutterBottom>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Name"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Image"
              name="image"
              value={product.image}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Brand"
              name="brand"
              value={product.brand}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Category"
              name="category"
              value={product.category}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              multiline
              rows={4}
              label="Description"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              type="number"
              label="Cost"
              name="cost"
              value={product.cost}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              type="number"
              label="Profit"
              name="profit"
              value={product.profit} //0.1% to 100%
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              required
              type="number"
              label="Quantity"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
        Add Product
        </Button>

        </form>
</Container>
);
}

export default AddProduct;