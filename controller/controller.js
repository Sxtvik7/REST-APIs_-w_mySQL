const mysql = require("mysql");

const conn = require("../Database/data.js");

//Home Page

const home = (req, res) => {
  res.send("helloWorld");
};
//----------------------------------------------------------

//Get Product

const getAllProducts = (req, res) => {
  conn.query("SELECT * FROM products", (err, results, fields) => {
    if (err) {
      console.error("Error Executing query: ", err);
      res.status(500).send("internal Server Error");
      return;
    }
    console.log(results);
    res.json(results);
  });
};
//----------------------------------------------------------

// Create Products

const createProduct = (req, res) => {
  const { id, name, description, price } = req.body;
  conn.query(
    "INSERT INTO products (id, name, description, price) VALUES (?,?,?,?)",
    [id, name, description, price],
    (error, results, fields) => {
      if (error) {
        console.error("Error executing query: ", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.status(201).json({ message: "Data added succesfully" });
    }
  );
};
//----------------------------------------------------------

//update product

const updateProductByName = (req, res) => {
  const { id, name, description, price } = req.body;
  const productName = req.params.productName;

  conn.query(
    "UPDATE products SET description=?, price=? WHERE name=?",
    [description, price, productName],
    (error, results, fields) => {
      if (error) {
        console.error("Error executing query: ", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json({ message: "Data updated successfully" });
    }
  );
};
//----------------------------------------------------------

//Delete Product

const deleteProduct = (req, res) => {
  const productId = req.params.productId;

  conn.query(
    "DELETE FROM products WHERE id=?",
    [productId],
    (error, result, fields) => {
      if (error) {
        console.error("Error executing query: ", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Product not found" });
        console.log(productId);
        return;
      }

      res.status(200).json({ message: "Product deleted successfully" });
    }
  );
};

module.exports = {
  home,
  getAllProducts,
  createProduct,
  updateProductByName,
  deleteProduct,
};
