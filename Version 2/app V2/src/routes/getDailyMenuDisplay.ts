import type express from 'express';
import logger from '../utils/logger';
import { database } from '../utils/database';
import { MenuItem } from '../models/menuitem';

interface GetDailyMenuDisplayResponse {
  date: string;
  menu_items_by_course: { 
    [course: string]: {
      menu_item_id: string;
      name: string;
      description: string;
      categories: string[];
    } | null 
  };
}

const getDailyMenuDisplay = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      // Validate date query parameter
      const date = req.query.date as string;
      
      if (!date) {
        res.status(400).json({ error: 'Date query parameter is required' });
        return;
      }

      // Validate date format (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) {
        res.status(400).json({ error: 'Invalid date format. Expected YYYY-MM-DD' });
        return;
      }

      // Get database connection
      const db = await database.getDb();

      // Retrieve all user selections for the specified date
      const userSelections = await db.collection<any>('user_selections')
        .find({ date: date })
        .toArray();

      logger.info(`Found ${userSelections.length} user selections for date ${date}`);

      // Aggregate selections by course
      // We'll count which menu_item_id appears most frequently for each course
      const courseAggregation: { [course: string]: { [menuItemId: string]: number } } = {};

      for (const userSelection of userSelections) {
        if (userSelection.selections) {
          for (const [course, menuItemId] of Object.entries(userSelection.selections)) {
            if (!courseAggregation[course]) {
              courseAggregation[course] = {};
            }
            const itemId = menuItemId as string;
            if (!courseAggregation[course][itemId]) {
              courseAggregation[course][itemId] = 0;
            }
            courseAggregation[course][itemId]++;
          }
        }
      }

      // For each course, select the most popular menu item
      const menuItemsByCourse: { 
        [course: string]: {
          menu_item_id: string;
          name: string;
          description: string;
          categories: string[];
        } | null 
      } = {};

      for (const [course, itemCounts] of Object.entries(courseAggregation)) {
        // Find the menu item with the highest count
        let maxCount = 0;
        let selectedMenuItemId: string | null = null;

        for (const [menuItemId, count] of Object.entries(itemCounts)) {
          if (count > maxCount) {
            maxCount = count;
            selectedMenuItemId = menuItemId;
          }
        }

        if (selectedMenuItemId) {
          // Fetch the menu item details
          const menuItem = await MenuItem.findById(selectedMenuItemId);
          
          if (menuItem) {
            menuItemsByCourse[course] = {
              menu_item_id: menuItem.menu_item_id,
              name: menuItem.name,
              description: menuItem.description,
              categories: menuItem.categories,
            };
          } else {
            menuItemsByCourse[course] = null;
          }
        } else {
          menuItemsByCourse[course] = null;
        }
      }

      // Prepare response
      const response: GetDailyMenuDisplayResponse = {
        date: date,
        menu_items_by_course: menuItemsByCourse,
      };

      res.status(200).json(response);
      return;
    } catch (e) {
      next(e);
    }
  };
  return handler;
};

export default getDailyMenuDisplay;
