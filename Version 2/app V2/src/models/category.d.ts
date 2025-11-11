export declare class Category {
    category_id: string;
    name: string;
    private static collectionName;
    constructor(category_id: string, name: string);
    /**
     * Creates a Category instance from a MongoDB document.
     * @param doc The MongoDB document.
     * @returns A new Category instance, or null if the document is null/undefined.
     */
    static fromDocument(doc: any): Category | null;
    /**
     * Converts the Category instance into a MongoDB document.
     * @returns An object suitable for MongoDB insertion/update.
     */
    toDocument(): any;
    /**
     * Creates a new category in the database.
     * @param category The Category instance to create.
     * @returns The created Category instance, or null if creation failed.
     */
    static create(category: Category): Promise<Category | null>;
    /**
     * Finds a category by its category_id.
     * @param category_id The UUID of the category to find.
     * @returns The found Category instance, or null if not found.
     */
    static findById(category_id: string): Promise<Category | null>;
    /**
     * Finds a category by its name.
     * @param name The name of the category to find.
     * @returns The found Category instance, or null if not found.
     */
    static findByName(name: string): Promise<Category | null>;
    /**
     * Updates an existing category in the database.
     * @param category_id The UUID of the category to update.
     * @param updateFields An object containing the fields to update.
     * @returns The updated Category instance, or null if update failed or not found.
     */
    static update(category_id: string, updateFields: Partial<Category>): Promise<Category | null>;
    /**
     * Deletes a category from the database.
     * @param category_id The UUID of the category to delete.
     * @returns True if the category was deleted, false otherwise.
     */
    static delete(category_id: string): Promise<boolean>;
    /**
     * Retrieves all categories from the database.
     * @returns An array of Category instances.
     */
    static findAll(): Promise<Category[]>;
}
