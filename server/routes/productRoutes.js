import express from 'express';
import Products from '../models/Products.js';

const productRoutes = express.Router();

const getProducts = async (req, res) => {
  const page = parseInt(req.params.page);
  const perPage = parseInt(req.params.perPage);

  const products = await Products.find({});

  if (page && perPage) {
    const totalPages = Math.ceil(products.length / perPage);
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedProducts = products.slice(startIndex, endIndex);
    res.json({ products: paginatedProducts, pagination: { currentPage: page, totalPages } });
  } else {
    res.json({ products, pagination: {} });
  }
};

productRoutes.route('/:page/:perPage').get(getProducts);
productRoutes.route('/').get(getProducts);

export default productRoutes;
