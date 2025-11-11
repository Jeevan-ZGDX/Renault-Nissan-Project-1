import type express from 'express';
import { randomUUID } from 'crypto';
import logger from '../utils/logger';
import { MenuItem } from '../models/menuitem';

interface CreateMenuItemRequest {
  name: string;
  description: string;
  categories?: string[];
}

interface CreateMenuItemResponse {
  menu_item_id: string;
  name: string;
  description: string;
  categories: string[];
}

const createMenuItem = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      const body = req.body as CreateMenuItemRequest;

      // Validate name
      if (!body.name || typeof body.name !== 'string' || body.name.trim() === '') {
        res.status(400).json({ error: 'Name is required and must be a non-empty string' });
        return;
      }

      // Validate description
      if (!body.description || typeof body.description !== 'string' || body.description.trim() === '') {
        res.status(400).json({ error: 'Description is required and must be a non-empty string' });
        return;
      }

      // Validate categories if provided
      let categories: string[] = [];
      if (body.categories !== undefined) {
        if (!Array.isArray(body.categories)) {
          res.status(400).json({ error: 'Categories must be an array of strings' });
          return;
        }
        
        for (const category of body.categories) {
          if (typeof category !== 'string') {
            res.status(400).json({ error: 'All categories must be strings' });
            return;
          }
        }
        
        categories = body.categories;
      }

      // Generate UUID for menu_item_id
      const menu_item_id = randomUUID();

      // Create MenuItem instance
      const menuItem = new MenuItem(
        menu_item_id,
        body.name.trim(),
        body.description.trim(),
        categories
      );

      // Save to database
      const createdMenuItem = await MenuItem.create(menuItem);

      if (!createdMenuItem) {
        throw new Error('Failed to create menu item in database');
      }

      // Fetch the saved menu item from database
      const savedMenuItem = await MenuItem.findById(menu_item_id);

      if (!savedMenuItem) {
        throw new Error('Failed to retrieve created menu item from database');
      }

      // Prepare response
      const response: CreateMenuItemResponse = {
        menu_item_id: savedMenuItem.menu_item_id,
        name: savedMenuItem.name,
        description: savedMenuItem.description,
        categories: savedMenuItem.categories
      };

      logger.info(`Menu item created successfully with ID: ${menu_item_id}`);
      res.status(201).json(response);
      return;
    } catch (e) {
      next(e);
    }
  };
  return handler;
};

export default createMenuItem;
