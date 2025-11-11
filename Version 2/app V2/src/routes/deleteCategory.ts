import type express from 'express';
import logger from '../utils/logger';
import { Category } from '../models/category';

const deleteCategory = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      const categoryId = req.params.category_id;

      // Validate category_id parameter
      if (!categoryId) {
        res.status(400).json({ error: 'Category ID is required' });
        return;
      }

      // Check if category exists
      const existingCategory = await Category.findById(categoryId);
      if (!existingCategory) {
        res.status(404).json({ error: 'Category with the specified ID not found' });
        return;
      }

      // Delete the category
      const deleted = await Category.delete(categoryId);
      
      if (!deleted) {
        res.status(500).json({ error: 'Failed to delete category' });
        return;
      }

      logger.info(`Category ${categoryId} deleted successfully by user ${req.user?.id}`);
      res.status(200).json({ message: 'Category successfully deleted' });
      return;
    } catch (e) {
      next(e);
    }
  };
  return handler;
};

export default deleteCategory;
