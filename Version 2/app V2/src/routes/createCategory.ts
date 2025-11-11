import type express from 'express';
import { randomUUID } from 'crypto';
import logger from '../utils/logger';
import { Category } from '../models/category';

interface CreateCategoryRequest {
  name: string;
}

interface CreateCategoryResponse {
  category_id: string;
  name: string;
}

const createCategory = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      const body = req.body as CreateCategoryRequest;

      // Validate name attribute
      if (!body.name) {
        res.status(400).json({ error: 'Missing required field: name' });
        return;
      }

      if (typeof body.name !== 'string') {
        res.status(400).json({ error: 'Invalid field type: name must be a string' });
        return;
      }

      if (body.name.trim().length === 0) {
        res.status(400).json({ error: 'Invalid field value: name cannot be empty' });
        return;
      }

      // Generate UUID for category_id
      const categoryId = randomUUID();

      // Create category instance
      const category = new Category(categoryId, body.name.trim());

      // Save to database
      const createdCategory = await Category.create(category);

      if (!createdCategory) {
        const error = new Error('Failed to create category in database');
        next(error);
        return;
      }

      // Fetch the created category from database to ensure we return what was saved
      const savedCategory = await Category.findById(categoryId);

      if (!savedCategory) {
        const error = new Error('Failed to retrieve created category from database');
        next(error);
        return;
      }

      // Return the created category
      const response: CreateCategoryResponse = {
        category_id: savedCategory.category_id,
        name: savedCategory.name,
      };

      res.status(201).json(response);
      return;
    } catch (e) {
      next(e);
    }
  };
  return handler;
};

export default createCategory;
