import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';
import express from 'express';
import Product from '../models/product.model.js';
import mongoose from 'mongoose';

const router = express.Router();

export default router;

router.get('/', getProducts  );



router.post('/', createProduct);


//if all fields are updating use put method, if only one field is updating use patch method
router.put('/:id', updateProduct
  
);

router.delete('/:id', deleteProduct

);
