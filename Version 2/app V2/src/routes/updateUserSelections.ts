import type express from 'express';
import logger from '../utils/logger';
import { UserSelection } from '../models/userselection';
import { randomUUID } from 'crypto';

interface UpdateUserSelectionsRequest {
  date: string; // ISO 8601 format (YYYY-MM-DD)
  selections: { [course: string]: string }; // Key-value pairs of meal course and selected menu item ID
}

interface UpdateUserSelectionsResponse {
  user_selection_id: string;
  user_id: string;
  date: string;
  selections: { [course: string]: string };
}

const updateUserSelections = (): express.RequestHandler => {
  const handler: express.RequestHandler = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const body = req.body as UpdateUserSelectionsRequest;

      // Validate date field
      if (!body.date) {
        res.status(400).json({ error: 'Date is required' });
        return;
      }

      if (typeof body.date !== 'string') {
        res.status(400).json({ error: 'Date must be a string' });
        return;
      }

      // Validate date format (ISO 8601 YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(body.date)) {
        res.status(400).json({ error: 'Date must be in ISO 8601 format (YYYY-MM-DD)' });
        return;
      }

      // Validate that the date is a valid date
      const parsedDate = new Date(body.date);
      if (isNaN(parsedDate.getTime())) {
        res.status(400).json({ error: 'Invalid date' });
        return;
      }

      // Validate selections field
      if (!body.selections) {
        res.status(400).json({ error: 'Selections are required' });
        return;
      }

      if (typeof body.selections !== 'object' || Array.isArray(body.selections)) {
        res.status(400).json({ error: 'Selections must be an object' });
        return;
      }

      // Validate selections is not empty
      if (Object.keys(body.selections).length === 0) {
        res.status(400).json({ error: 'Selections cannot be empty' });
        return;
      }

      // Check if user selection already exists for this user and date
      const existingSelection = await UserSelection.findByUserIdAndDate(userId, body.date);

      let result: UserSelection | null;
      let statusCode: number;

      if (existingSelection) {
        // Update existing selection
        result = await UserSelection.update(existingSelection.user_selection_id, {
          selections: body.selections
        });

        if (!result) {
          res.status(400).json({ error: 'Failed to update user selections' });
          return;
        }

        statusCode = 200;
        logger.info(`Updated user selections for user ${userId} on date ${body.date}`);
      } else {
        // Create new selection
        const userSelectionId = randomUUID();
        const newUserSelection = new UserSelection(
          userSelectionId,
          userId,
          body.date,
          body.selections
        );

        result = await UserSelection.create(newUserSelection);

        if (!result) {
          res.status(400).json({ error: 'Failed to create user selections' });
          return;
        }

        statusCode = 201;
        logger.info(`Created user selections for user ${userId} on date ${body.date}`);
      }

      // Fetch the saved data from the database to return
      const savedSelection = await UserSelection.findById(result.user_selection_id);

      if (!savedSelection) {
        res.status(400).json({ error: 'Failed to retrieve saved user selections' });
        return;
      }

      const response: UpdateUserSelectionsResponse = {
        user_selection_id: savedSelection.user_selection_id,
        user_id: savedSelection.user_id,
        date: savedSelection.date,
        selections: savedSelection.selections
      };

      res.status(statusCode).json(response);
      return;
    } catch (e) {
      next(e);
    }
  };
  return handler;
};

export default updateUserSelections;
