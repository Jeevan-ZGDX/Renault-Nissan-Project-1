import type express from 'express';
import logger from '../utils/logger';
import { Category } from '../models/category';

interface GetCategoriesResponse {
  categories: {
    category_id: string;
    name: string;
  }[];
}

const getCategories = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      logger.info('Retrieving all categories');

      // Retrieve all categories from the database
      const categories = await Category.findAll();

      // Map categories to response format
      const response: GetCategoriesResponse = {
        categories: categories.map(category => ({
          category_id: category.category_id,
          name: category.name
        }))
      };

      logger.info(`Successfully retrieved ${categories.length} categories`);
      res.status(200).json(response);
      return;
    } catch (e) {
      logger.error(`Error retrieving categories: ${e}`);
      next(e);
    }
  };
  return handler;
};

export default getCategories;
