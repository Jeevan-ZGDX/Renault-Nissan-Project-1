import type express from 'express';
import logger from '../utils/logger';
import { UserSelection } from '../models/userselection';

interface GetUserSelectionsResponse {
  user_selection_id: string;
  user_id: string;
  date: string;
  selections: { [course: string]: string };
}

const getUserSelections = (): express.RequestHandler => {
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
        res.status(400).json({ error: 'Date must be in YYYY-MM-DD format' });
        return;
      }

      // Get user ID from authentication context
      const userId = req.user.id;

      // Retrieve user selections from database
      const userSelection = await UserSelection.findByUserIdAndDate(userId, date);

      if (!userSelection) {
        res.status(404).json({ error: 'User selections not found for the specified date' });
        return;
      }

      // Prepare response
      const response: GetUserSelectionsResponse = {
        user_selection_id: userSelection.user_selection_id,
        user_id: userSelection.user_id,
        date: userSelection.date,
        selections: userSelection.selections
      };

      res.status(200).json(response);
      return;
    } catch (e) {
      next(e);
    }
  };
  return handler;
};

export default getUserSelections;
