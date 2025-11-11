import type express from 'express';
import logger from '../utils/logger';
import { MenuItem } from '../models/menuitem';

interface UpdateMenuItemRequest {
  name?: string;
  description?: string;
  categories?: string[];
}

interface UpdateMenuItemResponse {
  menu_item_id: string;
  name: string;
  description: string;
  categories: string[];
}

const updateMenuItem = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      const { menu_item_id } = req.params;
      const body = req.body as UpdateMenuItemRequest;

      // Validate menu_item_id
      if (!menu_item_id || typeof menu_item_id !== 'string' || menu_item_id.trim() === '') {
        res.status(400).json({ error: 'Invalid menu_item_id' });
        return;
      }

      // Check if menu item exists
      const existingMenuItem = await MenuItem.findById(menu_item_id);
      if (!existingMenuItem) {
        res.status(404).json({ error: 'Menu item with the specified ID not found' });
        return;
      }

      // Build updates object
      const updates: Partial<MenuItem> = {};

      // Validate and add name if provided
      if (body.name !== undefined) {
        if (typeof body.name !== 'string') {
          res.status(400).json({ error: 'Invalid name: must be a string' });
          return;
        }
        if (body.name.trim() === '') {
          res.status(400).json({ error: 'Invalid name: cannot be empty' });
          return;
        }
        updates.name = body.name;
      }

      // Validate and add description if provided
      if (body.description !== undefined) {
        if (typeof body.description !== 'string') {
          res.status(400).json({ error: 'Invalid description: must be a string' });
          return;
        }
        updates.description = body.description;
      }

      // Validate and add categories if provided
      if (body.categories !== undefined) {
        if (!Array.isArray(body.categories)) {
          res.status(400).json({ error: 'Invalid categories: must be an array' });
          return;
        }
        for (const category of body.categories) {
          if (typeof category !== 'string') {
            res.status(400).json({ error: 'Invalid categories: all elements must be strings' });
            return;
          }
        }
        updates.categories = body.categories;
      }

      // Check if there are any updates to apply
      if (Object.keys(updates).length === 0) {
        res.status(400).json({ error: 'No valid fields to update' });
        return;
      }

      // Update the menu item
      const updatedMenuItem = await MenuItem.update(menu_item_id, updates);

      if (!updatedMenuItem) {
        res.status(404).json({ error: 'Menu item with the specified ID not found' });
        return;
      }

      // Fetch the updated menu item from the database
      const fetchedMenuItem = await MenuItem.findById(menu_item_id);

      if (!fetchedMenuItem) {
        res.status(404).json({ error: 'Menu item with the specified ID not found' });
        return;
      }

      // Prepare response
      const response: UpdateMenuItemResponse = {
        menu_item_id: fetchedMenuItem.menu_item_id,
        name: fetchedMenuItem.name,
        description: fetchedMenuItem.description,
        categories: fetchedMenuItem.categories,
      };

      res.status(200).json(response);
      return;
    } catch (e) {
      next(e);
    }
  };
  return handler;
};

export default updateMenuItem;
