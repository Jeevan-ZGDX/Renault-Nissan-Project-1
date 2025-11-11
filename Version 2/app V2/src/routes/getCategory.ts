import type express from 'express';
import logger from '../utils/logger';
import { Category } from '../models/category';

interface GetCategoryResponse {
  category_id: string;
  name: string;
}

const getCategory = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      const categoryId = req.params.category_id;

      // Validate category_id parameter
      if (!categoryId) {
        res.status(400).json({ error: 'Category ID is required' });
        return;
      }

      // Retrieve the category from the database
      const category = await Category.findById(categoryId);

      // Check if category exists
      if (!category) {
        res.status(404).json({ error: 'Category with the specified ID not found' });
        return;
      }

      // Prepare response
      const response: GetCategoryResponse = {
        category_id: category.category_id,
        name: category.name,
      };

      res.status(200).json(response);
      return;
    } catch (e) {
      next(e);
    }
  };
  return handler;
};

export default getCategory;
