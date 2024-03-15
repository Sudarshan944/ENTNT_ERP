// components/ProductsManagement.js
import React, { useState } from "react";
import { useProducts } from "../data/products";
import ReactPaginate from "react-paginate";
import "../styles/ProductsManagement.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductsManagement = () => {
  const { products, updateProductsData } = useProducts();
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.id.toString().includes(searchQuery) ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const pagesVisited = currentPage * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    pagesVisited,
    pagesVisited + itemsPerPage
  );
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  // Change page
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

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
    toast.success(`New order ${newProduct.id} added`);
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    updateProductsData(updatedProducts);
    toast.success(`Order ${productId} deleted`);
  };

  return (
    <div className="products-management">
      <h2>Products Management</h2>
      <ToastContainer />
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control"
        />
      </div>
      <table className="table table-striped">
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
          {currentProducts.map((product) => (
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

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
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
