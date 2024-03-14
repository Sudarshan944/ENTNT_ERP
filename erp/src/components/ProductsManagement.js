// components/ProductsManagement.js
import React, { useState } from "react";
import { useProducts } from "../data/products";
import "../styles/ProductsManagement.css";

const ProductsManagement = () => {
  const { products, updateProductsData } = useProducts();
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      name: productName,
      category,
      price: parseFloat(price),
      stock: parseInt(stock),
    };
    const updatedProducts = [...products, newProduct];
    updateProductsData(updatedProducts);
    setProductName("");
    setCategory("");
    setPrice("");
    setStock("");
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    updateProductsData(updatedProducts);
  };

  return (
    <div className="products-management">
      <h2>Products Management</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Product</h3>
      <div className="add-product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default ProductsManagement;
