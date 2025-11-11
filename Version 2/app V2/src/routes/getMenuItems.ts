import type express from 'express';
import logger from '../utils/logger';
import { database } from '../utils/database';
import { MenuItem } from '../models/menuitem';

interface GetMenuItemsResponse {
  menu_items: {
    menu_item_id: string;
    name: string;
    description: string;
    categories: string[];
  }[];
}

const getMenuItems = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      const category = req.query.category as string | undefined;

      const db = await database.getDb();
      
      // Build the query filter
      const filter: any = {};
      if (category) {
        filter.categories = category;
      }

      // Retrieve menu items from the database
      const docs = await db.collection<any>('menu_items').find(filter).toArray();

      // Convert documents to MenuItem instances
      const menuItems = docs
        .map(doc => MenuItem.fromDocument(doc))
        .filter(item => item !== null)
        .map(item => ({
          menu_item_id: item!.menu_item_id,
          name: item!.name,
          description: item!.description,
          categories: item!.categories,
        }));

      const response: GetMenuItemsResponse = {
        menu_items: menuItems,
      };

      logger.info(`Retrieved ${menuItems.length} menu items${category ? ` for category: ${category}` : ''}`);

      res.status(200).json(response);
      return;
    } catch (e) {
      next(e);
    }
  };
  return handler;
};

export default getMenuItems;
