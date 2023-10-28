const { productCategoryModel } = require("../models");
const { errorResp, okResp } = require("../utils/responseHandlers");

const getCategories = async (_req, res) => {
  try {
    const categories = await productCategoryModel.loadCategories();
    const mapCategories = categories.map((category) => ({
      ...category,
    }));
    return res
      .status(200)
      .json(okResp("Sucessfully fetching all categories", mapCategories));
  } catch (e) {
    console.error("Error fetching categories: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

const createNewCategory = async (req, res) => {
  try {
    const newCategory = req.body;

    if (!newCategory.name) {
      return res.status(401).json(errorResp("name is required"));
    }

    const addedCategory = await productCategoryModel.addCategory(newCategory);
    return res
      .status(200)
      .json(okResp("Successfully create product category", addedCategory));
  } catch (e) {
    console.error("Error creating product category: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const deletedCategory = await productCategoryModel.deleteCategory(
      categoryId
    );
    return res
      .status(200)
      .json(okResp("Successfully delete product category", deletedCategory));
  } catch (e) {
    console.error("Error deleting product category: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedData = req.body;

    const updatedCategory = await productCategoryModel.editCategory(
      categoryId,
      updatedData
    );
    return res
      .status(200)
      .json(okResp("Successfully updated product category", updatedCategory));
  } catch (e) {
    console.error("Error updating product category: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

const getTotalProductCategoryCount = async (_req, res) => {
  try {
    const totalProductCategory =
      await productCategoryModel.getProductCategoryCount();

    return res
      .status(200)
      .json(
        okResp("Sucessfully get product category count", totalProductCategory)
      );
  } catch (e) {
    console.error("Error get product count: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

module.exports = {
  getCategories,
  createNewCategory,
  deleteCategory,
  updateCategory,
  getTotalProductCategoryCount,
};
