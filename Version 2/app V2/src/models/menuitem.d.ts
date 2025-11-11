export declare class MenuItem {
    menu_item_id: string;
    name: string;
    description: string;
    categories: string[];
    constructor(menu_item_id: string, name: string, description: string, categories: string[]);
    /**
     * Creates a MenuItem instance from a MongoDB document.
     * @param doc The MongoDB document.
     * @returns A MenuItem instance, or null if the document is invalid.
     */
    static fromDocument(doc: any): MenuItem | null;
    /**
     * Converts the MenuItem instance to a MongoDB document.
     * @returns A plain object suitable for MongoDB insertion/update.
     */
    toDocument(): any;
    /**
     * Inserts a new MenuItem into the database.
     * @param menuItem The MenuItem instance to insert.
     * @returns The inserted MenuItem instance, or null if insertion failed.
     */
    static create(menuItem: MenuItem): Promise<MenuItem | null>;
    /**
     * Finds a MenuItem by its menu_item_id.
     * @param menu_item_id The UUID of the menu item.
     * @returns The found MenuItem instance, or null if not found.
     */
    static findById(menu_item_id: string): Promise<MenuItem | null>;
    /**
     * Finds a MenuItem by its name.
     * @param name The name of the menu item.
     * @returns The found MenuItem instance, or null if not found.
     */
    static findByName(name: string): Promise<MenuItem | null>;
    /**
     * Updates an existing MenuItem in the database.
     * @param menu_item_id The UUID of the menu item to update.
     * @param updates An object containing the fields to update.
     * @returns The updated MenuItem instance, or null if not found or update failed.
     */
    static update(menu_item_id: string, updates: Partial<MenuItem>): Promise<MenuItem | null>;
    /**
     * Deletes a MenuItem from the database.
     * @param menu_item_id The UUID of the menu item to delete.
     * @returns True if deletion was successful, false otherwise.
     */
    static delete(menu_item_id: string): Promise<boolean>;
}
