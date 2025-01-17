const { productModel } = require("../models");
const { errorResp, okResp } = require("../utils/responseHandlers");

getAllProducts = async (_req, res) => {
  try {
    const products = await productModel.loadProducts();
    const mapProducts = products.map((product) => ({
      ...product,
      price: parseFloat(product.price),
    }));
    return res
      .status(200)
      .json(okResp("Sucessfully fetching all products", mapProducts));
  } catch (e) {
    console.error("Error fetching products: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

getOneProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productModel.getSingleProduct(id);
    product.price = parseFloat(product.price);
    return res
      .status(200)
      .json(okResp("Sucessfully fetching one product", product));
  } catch (e) {
    console.error("Error fetching product: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    const updatedProduct = await productModel.editProduct(
      productId,
      updatedData
    );
    return res
      .status(200)
      .json(okResp("Successfully updated product", updatedProduct));
  } catch (e) {
    console.error("Error updating product: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

getTotalProductCount = async (req, res) => {
  try {
    const totalCount = await productModel.getTotalProductCount();
    return res
      .status(200)
      .json(okResp("Successfully get product count", totalCount));
  } catch (e) {
    console.error("Error get product count: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

getTotalStoreValue = async (req, res) => {
  try {
    const totalStoreValue = await productModel.getTotalStoreValue();
    return res
      .status(200)
      .json(okResp("Successfully get store value", totalStoreValue));
  } catch (e) {
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

getOutOfStockItemsWithCount = async (req, res) => {
  try {
    const { outOfStockItems, outOfStockItemsCount } =
      await productModel.getOutOfStockProducts();
    console.log(outOfStockItems);
    return res.status(200).json(
      okResp("Successfully get out of stock items", {
        outOfStockItems,
        outOfStockItemsCount,
      })
    );
  } catch (e) {
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  updateProduct,
  getTotalProductCount,
  getTotalStoreValue,
  getOutOfStockItemsWithCount,
};
