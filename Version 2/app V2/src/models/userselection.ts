import { ObjectId } from 'mongodb';
import { database } from '../utils/database';
import logger from '../utils/logger';

export class UserSelection {
  public user_selection_id: string;
  public user_id: string;
  public date: string;
  public selections: Record<string, string>; // Key-value pairs of meal course and selected menu item ID

  constructor(
    user_selection_id: string,
    user_id: string,
    date: string,
    selections: Record<string, string>
  ) {
    this.user_selection_id = user_selection_id;
    this.user_id = user_id;
    this.date = date;
    this.selections = selections;
  }

  /**
   * Creates a UserSelection instance from a MongoDB document.
   * @param doc The MongoDB document.
   * @returns A UserSelection instance, or null if the document is invalid.
   */
  static fromDocument(doc: any): UserSelection | null {
    if (!doc) {
      return null;
    }
    return new UserSelection(
      doc.user_selection_id,
      doc.user_id,
      doc.date,
      doc.selections
    );
  }

  /**
   * Converts the UserSelection instance to a MongoDB document.
   * @returns A plain JavaScript object suitable for MongoDB insertion/update.
   */
  toDocument(): any {
    return {
      user_selection_id: this.user_selection_id,
      user_id: this.user_id,
      date: this.date,
      selections: this.selections,
    };
  }

  /**
   * Inserts a new UserSelection into the database.
   * @param userSelection The UserSelection instance to insert.
   * @returns The created UserSelection instance, or null if creation failed.
   */
  static async create(userSelection: UserSelection): Promise<UserSelection | null> {
    try {
      const db = await database.getDb();
      const result = await db.collection<any>('user_selections').insertOne(userSelection.toDocument());
      if (result.acknowledged) {
        return userSelection;
      }
      return null;
    } catch (error) {
      logger.error(`Error creating user selection: ${error}`);
      return null;
    }
  }

  /**
   * Finds a UserSelection by its user_selection_id.
   * @param user_selection_id The UUID of the user selection.
   * @returns The found UserSelection instance, or null if not found.
   */
  static async findById(user_selection_id: string): Promise<UserSelection | null> {
    try {
      const db = await database.getDb();
      const doc = await db.collection<any>('user_selections').findOne({ user_selection_id: user_selection_id });
      return UserSelection.fromDocument(doc);
    } catch (error) {
      logger.error(`Error finding user selection by ID ${user_selection_id}: ${error}`);
      return null;
    }
  }

  /**
   * Finds a UserSelection by user_id and date.
   * @param user_id The ID of the user.
   * @param date The date of the selection.
   * @returns The found UserSelection instance, or null if not found.
   */
  static async findByUserIdAndDate(user_id: string, date: string): Promise<UserSelection | null> {
    try {
      const db = await database.getDb();
      const doc = await db.collection<any>('user_selections').findOne({ user_id: user_id, date: date });
      return UserSelection.fromDocument(doc);
    } catch (error) {
      logger.error(`Error finding user selection for user ${user_id} on date ${date}: ${error}`);
      return null;
    }
  }

  /**
   * Updates an existing UserSelection in the database.
   * @param user_selection_id The UUID of the user selection to update.
   * @param updates An object containing the fields to update.
   * @returns The updated UserSelection instance, or null if update failed or not found.
   */
  static async update(user_selection_id: string, updates: Partial<UserSelection>): Promise<UserSelection | null> {
    try {
      const db = await database.getDb();
      // Ensure _id is not part of the update and only business ID is used for query
      const { user_selection_id: _, ...updateFields } = updates;
      const updatedDoc: Document | null = await db.collection<any>('user_selections').findOneAndUpdate(
        { user_selection_id: user_selection_id },
        { $set: updateFields },
        { returnDocument: 'after' }
      );
      return UserSelection.fromDocument(updatedDoc);
    } catch (error) {
      logger.error(`Error updating user selection ${user_selection_id}: ${error}`);
      return null;
    }
  }

  /**
   * Deletes a UserSelection from the database by its user_selection_id.
   * @param user_selection_id The UUID of the user selection to delete.
   * @returns True if deletion was successful, false otherwise.
   */
  static async delete(user_selection_id: string): Promise<boolean> {
    try {
      const db = await database.getDb();
      const result = await db.collection<any>('user_selections').deleteOne({ user_selection_id: user_selection_id });
      return result.deletedCount === 1;
    } catch (error) {
      logger.error(`Error deleting user selection ${user_selection_id}: ${error}`);
      return false;
    }
  }
}
