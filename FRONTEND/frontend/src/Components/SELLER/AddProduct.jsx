import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    image: "",
    price: "",
    category: "",
  });
  const router = useNavigate();

  const handleChange = (event) => {
    setProductData({ ...productData, [event.target.name]: event.target.value });
    // console.log([event.target.name])
    console.log(productData);
  };

  const selectRole = (event) => {
    setProductData({ ...productData, role: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      productData.name &&
      productData.price &&
      productData.image &&
      productData.category
    ) {
      try {
        const response = await axios.post("http://localhost:8008/add-product", {
        
          productData,
        });
        if (response.data.success) {
          setProductData({ name: "", price: "", image: "", category: "" });
        //   router("/yourproduct");
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("All fields are mandtory.");
    }
  };

  

  return (
    <div style={{ width: "40%", margin: "auto", marginTop: "50px" }}>
      <form
        style={{ width: "60%", margin: "auto", textAlign: "center" }}
        onSubmit={handleSubmit}
      >
        
        <label>Enter Name :</label>
        <br />
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
        />
        <br />
        <label>Enter Price:</label>
        <br />
        <input
          type="text"
          name="price"
          value={productData.price}
          onChange={handleChange}
        />
        <br />
        <label>Enter Image :</label>
        <br />
        <input
          type="text"
          name="image"
          value={productData.image}
          onChange={handleChange}
        />
        <br />
        <label>Enter Category :</label>
        <br />
        <input
          type="text"
          name="category"
          value={productData.category}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
