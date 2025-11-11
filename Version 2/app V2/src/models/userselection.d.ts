export declare class UserSelection {
    user_selection_id: string;
    user_id: string;
    date: string;
    selections: Record<string, string>;
    constructor(user_selection_id: string, user_id: string, date: string, selections: Record<string, string>);
    /**
     * Creates a UserSelection instance from a MongoDB document.
     * @param doc The MongoDB document.
     * @returns A UserSelection instance, or null if the document is invalid.
     */
    static fromDocument(doc: any): UserSelection | null;
    /**
     * Converts the UserSelection instance to a MongoDB document.
     * @returns A plain JavaScript object suitable for MongoDB insertion/update.
     */
    toDocument(): any;
    /**
     * Inserts a new UserSelection into the database.
     * @param userSelection The UserSelection instance to insert.
     * @returns The created UserSelection instance, or null if creation failed.
     */
    static create(userSelection: UserSelection): Promise<UserSelection | null>;
    /**
     * Finds a UserSelection by its user_selection_id.
     * @param user_selection_id The UUID of the user selection.
     * @returns The found UserSelection instance, or null if not found.
     */
    static findById(user_selection_id: string): Promise<UserSelection | null>;
    /**
     * Finds a UserSelection by user_id and date.
     * @param user_id The ID of the user.
     * @param date The date of the selection.
     * @returns The found UserSelection instance, or null if not found.
     */
    static findByUserIdAndDate(user_id: string, date: string): Promise<UserSelection | null>;
    /**
     * Updates an existing UserSelection in the database.
     * @param user_selection_id The UUID of the user selection to update.
     * @param updates An object containing the fields to update.
     * @returns The updated UserSelection instance, or null if update failed or not found.
     */
    static update(user_selection_id: string, updates: Partial<UserSelection>): Promise<UserSelection | null>;
    /**
     * Deletes a UserSelection from the database by its user_selection_id.
     * @param user_selection_id The UUID of the user selection to delete.
     * @returns True if deletion was successful, false otherwise.
     */
    static delete(user_selection_id: string): Promise<boolean>;
}
