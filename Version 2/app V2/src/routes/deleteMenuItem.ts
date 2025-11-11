import type express from 'express';
import logger from '../utils/logger';
import { MenuItem } from '../models/menuitem';

const deleteMenuItem = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      const { menu_item_id } = req.params;

      // Validate menu_item_id is provided
      if (!menu_item_id) {
        res.status(400).json({ error: 'menu_item_id is required' });
        return;
      }

      // Check if menu item exists
      const existingMenuItem = await MenuItem.findById(menu_item_id);
      if (!existingMenuItem) {
        res.status(404).json({ error: 'Menu item with the specified ID not found' });
        return;
      }

      // Delete the menu item
      const deleted = await MenuItem.delete(menu_item_id);
      
      if (!deleted) {
        res.status(500).json({ error: 'Failed to delete menu item' });
        return;
      }

      logger.info(`Menu item ${menu_item_id} successfully deleted by user ${req.user?.id}`);
      res.status(200).json({ message: 'Menu item successfully deleted' });
      return;
    } catch (e) {
      next(e);
    }
  };
  return handler;
};

export default deleteMenuItem;
