import type express from 'express';
import logger from '../utils/logger';
import { Category } from '../models/category';

interface UpdateCategoryRequest {
  name?: string;
}

interface UpdateCategoryResponse {
  category_id: string;
  name: string;
}

const updateCategory = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      const { category_id } = req.params;

      // Validate category_id
      if (!category_id) {
        res.status(400).json({ error: 'category_id is required' });
        return;
      }

      if (typeof category_id !== 'string' || category_id.trim() === '') {
        res.status(400).json({ error: 'Invalid category_id' });
        return;
      }

      // Check if category exists
      const existingCategory = await Category.findById(category_id);
      if (!existingCategory) {
        res.status(404).json({ error: 'Category with the specified ID not found' });
        return;
      }

      const body = req.body as UpdateCategoryRequest;

      // Validate name if provided
      if (body.name !== undefined) {
        if (typeof body.name !== 'string') {
          res.status(400).json({ error: 'name must be a string' });
          return;
        }

        if (body.name.trim() === '') {
          res.status(400).json({ error: 'name cannot be empty' });
          return;
        }
      }

      // Build update fields
      const updateFields: Partial<Category> = {};
      if (body.name !== undefined) {
        updateFields.name = body.name;
      }

      // If no fields to update, return the existing category
      if (Object.keys(updateFields).length === 0) {
        const response: UpdateCategoryResponse = {
          category_id: existingCategory.category_id,
          name: existingCategory.name,
        };
        res.status(200).json(response);
        return;
      }

      // Update the category
      const updatedCategory = await Category.update(category_id, updateFields);

      if (!updatedCategory) {
        res.status(404).json({ error: 'Category with the specified ID not found' });
        return;
      }

      // Fetch the updated category from the database
      const fetchedCategory = await Category.findById(category_id);

      if (!fetchedCategory) {
        res.status(404).json({ error: 'Category with the specified ID not found' });
        return;
      }

      const response: UpdateCategoryResponse = {
        category_id: fetchedCategory.category_id,
        name: fetchedCategory.name,
      };

      res.status(200).json(response);
      return;
    } catch (e) {
      next(e);
    }
  };
  return handler;
};

export default updateCategory;
