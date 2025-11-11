export default class ClientAPI {
    fetchJSON(endpoint: any, options?: {}): Promise<any>;
    getCookie(name: any): string;
    /**
     * Retrieves all categories.
     *
     * Request: GET /api/categories
     * No request body or query parameters
     *
     * Response: {
     *   categories: Array<{
     *     category_id: string,
     *     name: string
     *   }>
     * }
     */
    getCategories(): Promise<any>;
    /**
     * Creates a new category.
     *
     * Request: POST /api/category
     * Body: {
     *   name: string
     * }
     *
     * Response: 201 Created
     * Body: {
     *   category_id: string,
     *   name: string
     * }
     */
    createCategory(name: any): Promise<any>;
    /**
     * Deletes an existing category.
     *
     * Request:
     * - Path parameter: category_id (UUID)
     *
     * Response:
     * - 200 OK: Category successfully deleted (no body)
     * - 404 Not Found: Category with the specified ID not found
     */
    deleteCategory(categoryId: any): Promise<void>;
    /**
     * Retrieves a single category by ID.
     *
     * Request:
     * GET /api/category/{category_id}
     *
     * Response (200 OK):
     * {
     *   category_id: string,
     *   name: string
     * }
     *
     * @param {string} categoryId - The UUID of the category to retrieve
     * @returns {Promise<{category_id: string, name: string}>} The category object
     * @throws {Error} If the category is not found (404) or request fails
     */
    getCategory(categoryId: any): Promise<any>;
    /**
     * Updates an existing category.
     *
     * Request:
     * PUT /api/category/{category_id}
     * Body: {
     *   name?: string
     * }
     *
     * Response:
     * 200 OK: {
     *   category_id: string,
     *   name: string
     * }
     * 400 Bad Request: Invalid input
     * 404 Not Found: Category not found
     */
    updateCategory(categoryId: any, updateData: any): Promise<any>;
    /**
     * Retrieves the aggregated menu selections for a specific date for TV display.
     *
     * Request:
     * - Query Parameters:
     *   - date (required, string): The date for which to retrieve the menu display (YYYY-MM-DD)
     *
     * Response (200 OK):
     * {
     *   date: string,
     *   menu_items_by_course: {
     *     [course: string]: {
     *       menu_item_id: string,
     *       name: string,
     *       description: string,
     *       categories: string[]
     *     } | null
     *   }
     * }
     *
     * @param {string} date - The date for which to retrieve the menu display (YYYY-MM-DD)
     * @returns {Promise<Object>} The daily menu display data
     */
    getDailyMenuDisplay(date: any): Promise<any>;
    /**
     * Creates a new menu item.
     *
     * Request:
     * {
     *   name: string;
     *   description: string;
     *   categories?: string[];
     * }
     *
     * Response:
     * {
     *   menu_item_id: string;
     *   name: string;
     *   description: string;
     *   categories: string[];
     * }
     */
    createMenuItem(request: any): Promise<any>;
    /**
     * Deletes an existing menu item.
     *
     * Request:
     * - Path parameter: menu_item_id (UUID)
     *
     * Response:
     * - 200 OK: Menu item successfully deleted (no response body)
     * - 404 Not Found: Menu item with the specified ID not found
     */
    deleteMenuItem(menuItemId: any): Promise<void>;
    /**
     * Retrieves a single menu item by ID.
     *
     * Request:
     * - Path parameter: menu_item_id (string)
     *
     * Response (200 OK):
     * {
     *   menu_item_id: string,
     *   name: string,
     *   description: string,
     *   categories: string[]
     * }
     *
     * @param {string} menuItemId - The ID of the menu item to retrieve
     * @returns {Promise<Object>} The menu item data
     * @throws {Error} If the menu item is not found (404) or request fails
     */
    getMenuItem(menuItemId: any): Promise<any>;
    /**
     * Updates an existing menu item.
     *
     * Request:
     * PUT /api/menu_item/{menu_item_id}
     * Body: {
     *   name?: string;
     *   description?: string;
     *   categories?: string[];
     * }
     *
     * Response:
     * 200 OK: {
     *   menu_item_id: string;
     *   name: string;
     *   description: string;
     *   categories: string[];
     * }
     *
     * @param {string} menuItemId - The UUID of the menu item to update
     * @param {Object} updates - The fields to update
     * @param {string} [updates.name] - Updated name of the menu item
     * @param {string} [updates.description] - Updated description of the menu item
     * @param {string[]} [updates.categories] - Updated list of assigned meal categories
     * @returns {Promise<Object>} The updated menu item
     */
    updateMenuItem(menuItemId: any, updates: any): Promise<any>;
    /**
     * Retrieves all menu items, optionally filtered by category.
     *
     * Request:
     * - Query Parameters:
     *   - category (optional, string): Filters menu items by the specified category.
     *
     * Response (200 OK):
     * {
     *   menu_items: [
     *     {
     *       menu_item_id: string,
     *       name: string,
     *       description: string,
     *       categories: string[]
     *     }
     *   ]
     * }
     *
     * @param {string} [category] - Optional category to filter menu items by
     * @returns {Promise<{menu_items: Array<{menu_item_id: string, name: string, description: string, categories: string[]}>}>}
     */
    getMenuItems(category: any): Promise<any>;
    /**
     * Fetches the current storm user.
     * @async
     * @returns {Promise<{ userId: string, role: string, email: string, name: string }>} A promise that resolves to an object containing the user's ID and name, role and email.
     */
    getCurrentAuthUser(): Promise<any>;
    /**
     * Retrieves the user's menu selections for a specific date.
     *
     * Request:
     * - Query Parameters:
     *   - date (required, string): The date for which to retrieve selections (YYYY-MM-DD)
     *
     * Response (200 OK):
     * {
     *   user_selection_id: string,
     *   user_id: string,
     *   date: string,
     *   selections: { [course: string]: string }
     * }
     *
     * @param {string} date - The date for which to retrieve selections (YYYY-MM-DD)
     * @returns {Promise<Object>} The user selections for the specified date
     * @throws {Error} If the request fails or user selections not found
     */
    getUserSelections(date: any): Promise<any>;
    /**
     * Creates or updates the user's menu selections for a specific date.
     *
     * Request:
     * {
     *   date: string,              // ISO 8601 format (YYYY-MM-DD)
     *   selections: {              // Key-value pairs of meal course and selected menu item ID
     *     [course: string]: string
     *   }
     * }
     *
     * Response:
     * {
     *   user_selection_id: string,
     *   user_id: string,
     *   date: string,
     *   selections: {
     *     [course: string]: string
     *   }
     * }
     */
    updateUserSelections(userSelection: any): Promise<any>;
}
