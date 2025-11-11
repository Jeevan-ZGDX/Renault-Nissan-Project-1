import { ObjectId } from 'mongodb';
import { database } from '../utils/database';
import logger from '../utils/logger';

export class Category {
  public category_id: string;
  public name: string;

  private static collectionName = 'categories';

  constructor(category_id: string, name: string) {
    this.category_id = category_id;
    this.name = name;
  }

  /**
   * Creates a Category instance from a MongoDB document.
   * @param doc The MongoDB document.
   * @returns A new Category instance, or null if the document is null/undefined.
   */
  static fromDocument(doc: any): Category | null {
    if (!doc) {
      return null;
    }
    return new Category(doc.category_id, doc.name);
  }

  /**
   * Converts the Category instance into a MongoDB document.
   * @returns An object suitable for MongoDB insertion/update.
   */
  toDocument(): any {
    return {
      category_id: this.category_id,
      name: this.name,
    };
  }

  /**
   * Creates a new category in the database.
   * @param category The Category instance to create.
   * @returns The created Category instance, or null if creation failed.
   */
  static async create(category: Category): Promise<Category | null> {
    try {
      const db = await database.getDb();
      const result = await db.collection(Category.collectionName).insertOne(category.toDocument());
      if (result.acknowledged) {
        return category;
      }
      return null;
    } catch (error) {
      logger.error(`Error creating category: ${error}`);
      return null;
    }
  }

  /**
   * Finds a category by its category_id.
   * @param category_id The UUID of the category to find.
   * @returns The found Category instance, or null if not found.
   */
  static async findById(category_id: string): Promise<Category | null> {
    try {
      const db = await database.getDb();
      const doc = await db.collection(Category.collectionName).findOne({ category_id: category_id });
      return Category.fromDocument(doc);
    } catch (error) {
      logger.error(`Error finding category by ID ${category_id}: ${error}`);
      return null;
    }
  }

  /**
   * Finds a category by its name.
   * @param name The name of the category to find.
   * @returns The found Category instance, or null if not found.
   */
  static async findByName(name: string): Promise<Category | null> {
    try {
      const db = await database.getDb();
      const doc = await db.collection(Category.collectionName).findOne({ name: name });
      return Category.fromDocument(doc);
    } catch (error) {
      logger.error(`Error finding category by name ${name}: ${error}`);
      return null;
    }
  }

  /**
   * Updates an existing category in the database.
   * @param category_id The UUID of the category to update.
   * @param updateFields An object containing the fields to update.
   * @returns The updated Category instance, or null if update failed or not found.
   */
  static async update(category_id: string, updateFields: Partial<Category>): Promise<Category | null> {
    try {
      const db = await database.getDb();
      const result = await db.collection(Category.collectionName).findOneAndUpdate(
        { category_id: category_id },
        { $set: updateFields },
        { returnDocument: 'after' }
      );
      return Category.fromDocument(result);
    } catch (error) {
      logger.error(`Error updating category with ID ${category_id}: ${error}`);
      return null;
    }
  }

  /**
   * Deletes a category from the database.
   * @param category_id The UUID of the category to delete.
   * @returns True if the category was deleted, false otherwise.
   */
  static async delete(category_id: string): Promise<boolean> {
    try {
      const db = await database.getDb();
      const result = await db.collection(Category.collectionName).deleteOne({ category_id: category_id });
      return result.deletedCount === 1;
    } catch (error) {
      logger.error(`Error deleting category with ID ${category_id}: ${error}`);
      return false;
    }
  }

  /**
   * Retrieves all categories from the database.
   * @returns An array of Category instances.
   */
  static async findAll(): Promise<Category[]> {
    try {
      const db = await database.getDb();
      const docs = await db.collection(Category.collectionName).find({}).toArray();
      return docs.map(doc => Category.fromDocument(doc)).filter((category): category is Category => category !== null);
    } catch (error) {
      logger.error(`Error retrieving all categories: ${error}`);
      return [];
    }
  }
}
