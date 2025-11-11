import type express from 'express';
import logger from '../utils/logger';
import { MenuItem } from '../models/menuitem';

interface GetMenuItemResponse {
  menu_item_id: string;
  name: string;
  description: string;
  categories: string[];
}

const getMenuItem = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      const menuItemId = req.params.menu_item_id;

      // Validate menu_item_id parameter
      if (!menuItemId) {
        res.status(400).json({ error: 'menu_item_id is required' });
        return;
      }

      // Retrieve menu item from database
      const menuItem = await MenuItem.findById(menuItemId);

      // Check if menu item exists
      if (!menuItem) {
        res.status(404).json({ error: 'Menu item with the specified ID not found' });
        return;
      }

      // Prepare response
      const response: GetMenuItemResponse = {
        menu_item_id: menuItem.menu_item_id,
        name: menuItem.name,
        description: menuItem.description,
        categories: menuItem.categories,
      };

      res.status(200).json(response);
      return;
    } catch (e) {
      next(e);
    }
  };
  return handler;
};

export default getMenuItem;
