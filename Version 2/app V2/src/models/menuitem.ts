import { ObjectId } from 'mongodb';
import { database } from '../utils/database';
import logger from '../utils/logger';

export class MenuItem {
  public menu_item_id: string;
  public name: string;
  public description: string;
  public categories: string[];

  constructor(menu_item_id: string, name: string, description: string, categories: string[]) {
    this.menu_item_id = menu_item_id;
    this.name = name;
    this.description = description;
    this.categories = categories;
  }

  /**
   * Creates a MenuItem instance from a MongoDB document.
   * @param doc The MongoDB document.
   * @returns A MenuItem instance, or null if the document is invalid.
   */
  static fromDocument(doc: any): MenuItem | null {
    if (!doc) {
      return null;
    }
    return new MenuItem(
      doc.menu_item_id,
      doc.name,
      doc.description,
      doc.categories || []
    );
  }

  /**
   * Converts the MenuItem instance to a MongoDB document.
   * @returns A plain object suitable for MongoDB insertion/update.
   */
  toDocument(): any {
    return {
      menu_item_id: this.menu_item_id,
      name: this.name,
      description: this.description,
      categories: this.categories,
    };
  }

  /**
   * Inserts a new MenuItem into the database.
   * @param menuItem The MenuItem instance to insert.
   * @returns The inserted MenuItem instance, or null if insertion failed.
   */
  static async create(menuItem: MenuItem): Promise<MenuItem | null> {
    try {
      const db = await database.getDb();
      const result = await db.collection<any>('menu_items').insertOne(menuItem.toDocument());
      if (result.acknowledged) {
        return menuItem;
      }
      return null;
    } catch (error) {
      logger.error(`Error creating menu item: ${error}`);
      return null;
    }
  }

  /**
   * Finds a MenuItem by its menu_item_id.
   * @param menu_item_id The UUID of the menu item.
   * @returns The found MenuItem instance, or null if not found.
   */
  static async findById(menu_item_id: string): Promise<MenuItem | null> {
    try {
      const db = await database.getDb();
      const doc = await db.collection<any>('menu_items').findOne({ menu_item_id: menu_item_id });
      return MenuItem.fromDocument(doc);
    } catch (error) {
      logger.error(`Error finding menu item by ID ${menu_item_id}: ${error}`);
      return null;
    }
  }

  /**
   * Finds a MenuItem by its name.
   * @param name The name of the menu item.
   * @returns The found MenuItem instance, or null if not found.
   */
  static async findByName(name: string): Promise<MenuItem | null> {
    try {
      const db = await database.getDb();
      const doc = await db.collection<any>('menu_items').findOne({ name: name });
      return MenuItem.fromDocument(doc);
    } catch (error) {
      logger.error(`Error finding menu item by name ${name}: ${error}`);
      return null;
    }
  }

  /**
   * Updates an existing MenuItem in the database.
   * @param menu_item_id The UUID of the menu item to update.
   * @param updates An object containing the fields to update.
   * @returns The updated MenuItem instance, or null if not found or update failed.
   */
  static async update(menu_item_id: string, updates: Partial<MenuItem>): Promise<MenuItem | null> {
    try {
      const db = await database.getDb();
      const result = await db.collection<any>('menu_items').findOneAndUpdate(
        { menu_item_id: menu_item_id },
        { $set: updates },
        { returnDocument: 'after' }
      );
      return MenuItem.fromDocument(result);
    } catch (error) {
      logger.error(`Error updating menu item with ID ${menu_item_id}: ${error}`);
      return null;
    }
  }

  /**
   * Deletes a MenuItem from the database.
   * @param menu_item_id The UUID of the menu item to delete.
   * @returns True if deletion was successful, false otherwise.
   */
  static async delete(menu_item_id: string): Promise<boolean> {
    try {
      const db = await database.getDb();
      const result = await db.collection<any>('menu_items').deleteOne({ menu_item_id: menu_item_id });
      return result.deletedCount === 1;
    } catch (error) {
      logger.error(`Error deleting menu item with ID ${menu_item_id}: ${error}`);
      return false;
    }
  }
}