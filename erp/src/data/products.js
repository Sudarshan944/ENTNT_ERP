// products.js
import { useState, createContext, useContext, useEffect } from "react";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts
      ? JSON.parse(storedProducts)
      : [
          {
            id: 1,
            name: "Product 1",
            category: "Category 1",
            price: 19.99,
            stock: 10,
          },
          {
            id: 2,
            name: "Product 2",
            category: "Category 2",
            price: 29.99,
            stock: 5,
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const updateProductsData = (updatedProducts) => {
    setProducts(updatedProducts);
  };

  return (
    <ProductsContext.Provider value={{ products, updateProductsData }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
