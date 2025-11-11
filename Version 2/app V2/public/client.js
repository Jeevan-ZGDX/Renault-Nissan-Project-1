export default class ClientAPI {
  // Helper method for common fetch operations
  async fetchJSON(endpoint, options = {}) {
    const url = `${endpoint}`;

    // Get the auth token from cookie
    const authToken = this.getCookie("storm_app_token");

    // Build headers
    const headers = {
      // Only include Content-Type for requests with body
      ...(options.body && {
        "Content-Type": "application/json",
      }),
      // Add auth header if token exists
      ...(authToken && {
        Authorization: `Bearer ${authToken}`,
      }),
    };

    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || `Request failed with status ${response.status}`,
      );
    }

    return data;
  }

  // Helper method to get cookie by name
  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

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
  async getCategories() {
    const response = await this.fetchJSON('/api/categories', {
      method: 'GET'
    });
    
    return response;
  }

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
  async createCategory(name) {
    const response = await this.fetchJSON('/api/category', {
      method: 'POST',
      body: JSON.stringify({ name })
    });
    
    return response;
  }

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
  async deleteCategory(categoryId) {
    const endpoint = `/api/category/${categoryId}`;
    
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.getCookie('storm_app_token')}`
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Category with the specified ID not found');
      }
      throw new Error(`Request failed with status ${response.status}`);
    }
  }

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
  async getCategory(categoryId) {
    const endpoint = `/api/category/${encodeURIComponent(categoryId)}`;
    return await this.fetchJSON(endpoint, {
      method: 'GET'
    });
  }

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
  async updateCategory(categoryId, updateData) {
    const endpoint = `/api/category/${encodeURIComponent(categoryId)}`;
    
    const requestBody = {};
    if (updateData.name !== undefined) {
      requestBody.name = updateData.name;
    }
    
    return await this.fetchJSON(endpoint, {
      method: 'PUT',
      body: JSON.stringify(requestBody)
    });
  }

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
  async getDailyMenuDisplay(date) {
    const queryParams = new URLSearchParams({ date });
    const endpoint = `/api/daily_menu_display?${queryParams.toString()}`;
    
    return await this.fetchJSON(endpoint, {
      method: 'GET'
    });
  }

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
  async createMenuItem(request) {
    return await this.fetchJSON('/api/menu_item', {
      method: 'POST',
      body: JSON.stringify(request)
    });
  }

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
  async deleteMenuItem(menuItemId) {
    const endpoint = `/api/menu_item/${menuItemId}`;
    
    await this.fetchJSON(endpoint, {
      method: 'DELETE'
    });
  }

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
  async getMenuItem(menuItemId) {
    const endpoint = `/api/menu_item/${menuItemId}`;
    return await this.fetchJSON(endpoint, {
      method: 'GET'
    });
  }

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
  async updateMenuItem(menuItemId, updates) {
    const endpoint = `/api/menu_item/${menuItemId}`;
    
    const requestBody = {};
    if (updates.name !== undefined) {
      requestBody.name = updates.name;
    }
    if (updates.description !== undefined) {
      requestBody.description = updates.description;
    }
    if (updates.categories !== undefined) {
      requestBody.categories = updates.categories;
    }
    
    return await this.fetchJSON(endpoint, {
      method: 'PUT',
      body: JSON.stringify(requestBody)
    });
  }

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
  async getMenuItems(category) {
    const queryParams = new URLSearchParams();
    
    if (category) {
      queryParams.append('category', category);
    }
    
    const queryString = queryParams.toString();
    const endpoint = `/api/menu_items${queryString ? `?${queryString}` : ''}`;
    
    return await this.fetchJSON(endpoint, {
      method: 'GET'
    });
  }

  /**
   * Fetches the current storm user.
   * @async
   * @returns {Promise<{ userId: string, role: string, email: string, name: string }>} A promise that resolves to an object containing the user's ID and name, role and email.
   */
  async getCurrentAuthUser() {
      return await this.fetchJSON(`/api/storm/me`);
  }

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
  async getUserSelections(date) {
    const queryParams = new URLSearchParams({ date });
    const endpoint = `/api/user_selections?${queryParams.toString()}`;
    
    return await this.fetchJSON(endpoint, {
      method: 'GET'
    });
  }

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
  async updateUserSelections(userSelection) {
    const requestBody = {
      date: userSelection.date,
      selections: userSelection.selections
    };

    const response = await this.fetchJSON('/api/user_selections', {
      method: 'POST',
      body: JSON.stringify(requestBody)
    });

    return response;
  }
}