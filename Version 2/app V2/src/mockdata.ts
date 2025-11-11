import { database } from './utils/database';
import { ClientSession, Db } from 'mongodb';
import logger from './utils/logger';

import { v4 as uuidv4 } from 'uuid';
import { Category } from './models/category';
import { MenuItem } from './models/menuitem';
import { UserSelection } from './models/userselection';

async function insertMockData(db: Db, session: ClientSession) {
  // Define the meal categories
  const categoryNames = [
    "Breakfast",
    "Regular Lunch",
    "Diet Lunch",
    "Mini Meals",
    "Regular Dinner",
    "Diet Dinner",
    "Supper",
    "Special Item"
  ];

  // Create categories
  const categories: Category[] = [];
  for (const categoryName of categoryNames) {
    const category = new Category(uuidv4(), categoryName);
    await db.collection('categories').insertOne(category.toDocument(), { session });
    categories.push(category);
  }

  // Create menu items with various category assignments
  const menuItems: MenuItem[] = [];

  // Breakfast items
  menuItems.push(
    new MenuItem(
      uuidv4(),
      "Scrambled Eggs",
      "Fluffy scrambled eggs with herbs",
      ["Breakfast"]
    ),
    new MenuItem(
      uuidv4(),
      "Pancakes",
      "Golden pancakes with maple syrup",
      ["Breakfast"]
    ),
    new MenuItem(
      uuidv4(),
      "Oatmeal Bowl",
      "Healthy oatmeal with fresh berries",
      ["Breakfast"]
    ),
    new MenuItem(
      uuidv4(),
      "French Toast",
      "Classic French toast with cinnamon",
      ["Breakfast"]
    ),
    new MenuItem(
      uuidv4(),
      "Fruit Salad",
      "Fresh seasonal fruit medley",
      ["Breakfast", "Mini Meals"]
    )
  );

  // Regular Lunch items
  menuItems.push(
    new MenuItem(
      uuidv4(),
      "Grilled Chicken Breast",
      "Tender grilled chicken with herbs",
      ["Regular Lunch", "Regular Dinner"]
    ),
    new MenuItem(
      uuidv4(),
      "Beef Lasagna",
      "Classic Italian lasagna with rich meat sauce",
      ["Regular Lunch"]
    ),
    new MenuItem(
      uuidv4(),
      "Spaghetti Carbonara",
      "Creamy pasta with bacon and parmesan",
      ["Regular Lunch", "Regular Dinner"]
    ),
    new MenuItem(
      uuidv4(),
      "BBQ Ribs",
      "Slow-cooked ribs with tangy BBQ sauce",
      ["Regular Lunch", "Regular Dinner"]
    ),
    new MenuItem(
      uuidv4(),
      "Fish and Chips",
      "Crispy battered fish with golden fries",
      ["Regular Lunch"]
    )
  );

  // Diet Lunch items
  menuItems.push(
    new MenuItem(
      uuidv4(),
      "Grilled Salmon",
      "Fresh salmon fillet with lemon",
      ["Diet Lunch", "Diet Dinner"]
    ),
    new MenuItem(
      uuidv4(),
      "Caesar Salad",
      "Crisp romaine with light Caesar dressing",
      ["Diet Lunch", "Diet Dinner"]
    ),
    new MenuItem(
      uuidv4(),
      "Quinoa Bowl",
      "Nutritious quinoa with roasted vegetables",
      ["Diet Lunch", "Diet Dinner"]
    ),
    new MenuItem(
      uuidv4(),
      "Grilled Chicken Salad",
      "Mixed greens with grilled chicken strips",
      ["Diet Lunch", "Diet Dinner"]
    ),
    new MenuItem(
      uuidv4(),
      "Vegetable Stir Fry",
      "Fresh vegetables in light sauce",
      ["Diet Lunch", "Diet Dinner"]
    )
  );

  // Mini Meals items
  menuItems.push(
    new MenuItem(
      uuidv4(),
      "Chicken Wrap",
      "Grilled chicken in a soft tortilla",
      ["Mini Meals"]
    ),
    new MenuItem(
      uuidv4(),
      "Soup of the Day",
      "Homemade soup with fresh ingredients",
      ["Mini Meals"]
    ),
    new MenuItem(
      uuidv4(),
      "Club Sandwich",
      "Triple-decker sandwich with turkey and bacon",
      ["Mini Meals"]
    ),
    new MenuItem(
      uuidv4(),
      "Veggie Spring Rolls",
      "Crispy spring rolls with sweet chili sauce",
      ["Mini Meals"]
    ),
    new MenuItem(
      uuidv4(),
      "Cheese Quesadilla",
      "Melted cheese in a crispy tortilla",
      ["Mini Meals"]
    )
  );

  // Regular Dinner items
  menuItems.push(
    new MenuItem(
      uuidv4(),
      "Beef Steak",
      "Premium cut steak cooked to perfection",
      ["Regular Dinner"]
    ),
    new MenuItem(
      uuidv4(),
      "Roast Turkey",
      "Succulent roasted turkey with gravy",
      ["Regular Dinner"]
    ),
    new MenuItem(
      uuidv4(),
      "Pork Chops",
      "Juicy pork chops with apple sauce",
      ["Regular Dinner"]
    ),
    new MenuItem(
      uuidv4(),
      "Chicken Parmesan",
      "Breaded chicken with marinara and mozzarella",
      ["Regular Dinner"]
    )
  );

  // Diet Dinner items
  menuItems.push(
    new MenuItem(
      uuidv4(),
      "Steamed Vegetables",
      "Assorted steamed vegetables with herbs",
      ["Diet Dinner"]
    ),
    new MenuItem(
      uuidv4(),
      "Baked Cod",
      "Light and flaky baked cod fillet",
      ["Diet Dinner"]
    ),
    new MenuItem(
      uuidv4(),
      "Turkey Breast",
      "Lean turkey breast with herbs",
      ["Diet Dinner"]
    )
  );

  // Supper items
  menuItems.push(
    new MenuItem(
      uuidv4(),
      "Cheese and Crackers",
      "Assorted cheeses with gourmet crackers",
      ["Supper"]
    ),
    new MenuItem(
      uuidv4(),
      "Yogurt Parfait",
      "Greek yogurt with granola and honey",
      ["Supper"]
    ),
    new MenuItem(
      uuidv4(),
      "Toast with Jam",
      "Whole grain toast with fruit preserves",
      ["Supper"]
    ),
    new MenuItem(
      uuidv4(),
      "Hot Chocolate",
      "Rich hot chocolate with marshmallows",
      ["Supper"]
    )
  );

  // Special Items
  menuItems.push(
    new MenuItem(
      uuidv4(),
      "Lobster Thermidor",
      "Luxurious lobster in creamy sauce",
      ["Special Item"]
    ),
    new MenuItem(
      uuidv4(),
      "Prime Rib",
      "Slow-roasted prime rib with au jus",
      ["Special Item"]
    ),
    new MenuItem(
      uuidv4(),
      "Surf and Turf",
      "Steak and lobster tail combination",
      ["Special Item"]
    ),
    new MenuItem(
      uuidv4(),
      "Chef's Special Pasta",
      "Signature pasta dish with seasonal ingredients",
      ["Special Item"]
    ),
    new MenuItem(
      uuidv4(),
      "Chocolate Lava Cake",
      "Decadent chocolate cake with molten center",
      ["Special Item"]
    )
  );

  // Insert all menu items
  for (const menuItem of menuItems) {
    await db.collection('menu_items').insertOne(menuItem.toDocument(), { session });
  }

  // Create sample user selections for today
  const today = new Date();
  const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD format

  // Create a few sample user selections
  const userSelections: UserSelection[] = [];

  // User 1 selection
  const breakfastItems = menuItems.filter(item => item.categories.includes("Breakfast"));
  const regularLunchItems = menuItems.filter(item => item.categories.includes("Regular Lunch"));
  const dietLunchItems = menuItems.filter(item => item.categories.includes("Diet Lunch"));
  const miniMealItems = menuItems.filter(item => item.categories.includes("Mini Meals"));
  const regularDinnerItems = menuItems.filter(item => item.categories.includes("Regular Dinner"));
  const dietDinnerItems = menuItems.filter(item => item.categories.includes("Diet Dinner"));
  const supperItems = menuItems.filter(item => item.categories.includes("Supper"));
  const specialItems = menuItems.filter(item => item.categories.includes("Special Item"));

  userSelections.push(
    new UserSelection(
      uuidv4(),
      "user_001",
      todayString,
      {
        "Breakfast": breakfastItems[0]?.menu_item_id || "",
        "Regular Lunch": regularLunchItems[0]?.menu_item_id || "",
        "Diet Lunch": dietLunchItems[0]?.menu_item_id || "",
        "Mini Meals": miniMealItems[0]?.menu_item_id || "",
        "Regular Dinner": regularDinnerItems[0]?.menu_item_id || "",
        "Diet Dinner": dietDinnerItems[0]?.menu_item_id || "",
        "Supper": supperItems[0]?.menu_item_id || "",
        "Special Item": specialItems[0]?.menu_item_id || ""
      }
    )
  );

  userSelections.push(
    new UserSelection(
      uuidv4(),
      "user_002",
      todayString,
      {
        "Breakfast": breakfastItems[1]?.menu_item_id || "",
        "Regular Lunch": regularLunchItems[1]?.menu_item_id || "",
        "Diet Lunch": dietLunchItems[1]?.menu_item_id || "",
        "Mini Meals": miniMealItems[1]?.menu_item_id || "",
        "Regular Dinner": regularDinnerItems[1]?.menu_item_id || "",
        "Diet Dinner": dietDinnerItems[1]?.menu_item_id || "",
        "Supper": supperItems[1]?.menu_item_id || "",
        "Special Item": specialItems[1]?.menu_item_id || ""
      }
    )
  );

  userSelections.push(
    new UserSelection(
      uuidv4(),
      "user_003",
      todayString,
      {
        "Breakfast": breakfastItems[2]?.menu_item_id || "",
        "Regular Lunch": regularLunchItems[2]?.menu_item_id || "",
        "Diet Lunch": dietLunchItems[2]?.menu_item_id || "",
        "Mini Meals": miniMealItems[2]?.menu_item_id || "",
        "Regular Dinner": regularDinnerItems[2]?.menu_item_id || "",
        "Diet Dinner": dietDinnerItems[2]?.menu_item_id || "",
        "Supper": supperItems[2]?.menu_item_id || "",
        "Special Item": specialItems[2]?.menu_item_id || ""
      }
    )
  );

  // Insert user selections
  for (const userSelection of userSelections) {
    await db.collection('user_selections').insertOne(userSelection.toDocument(), { session });
  }
}

export { insertMockData };


// Flag to ensure we only try to populate once per process
let populationAttempted = false;

/**
 * Populates the database with mock data for the App
 */
async function populate_with_mock_data(): Promise<void> {
  // Process-level check to prevent multiple calls within the same process
  if (populationAttempted) {
    logger.info('Population already attempted in this process, skipping');
    return;
  }

  // Mark that we've attempted population in this process
  populationAttempted = true;

  const db = await database.getDb();
  const mockDataCollection = db.collection('mock_data_execution');

  try {
    // Try to create the flag document with a unique index
    // This will fail if another process has already created it
    const result = await mockDataCollection.updateOne(
      { _id: 'mock_data_flag' },
      {
        $setOnInsert: {
          executed: true,
          timestamp: Math.floor(Date.now() / 1000),
          instance: `instance-${Math.random().toString(36).substring(2, 15)}`
        }
      },
      { upsert: true }
    );

    // If the document was not inserted (upserted), it already exists
    if (result.upsertedCount === 0) {
      logger.info('Mock data flag already exists, skipping execution');
      return;
    }
    
    const userId = "storm_preview_user";
    logger.info(`Starting mock data population for ${userId}...`);

    // If we get here, we're the first to create the flag document
    // Now proceed with actual data insertion
    const client = await database.getClient();
    const session = await client.startSession();

    try {
      await session.withTransaction(async () => {
        await insertMockData(db, session);

        // Update the flag to mark successful completion
        await mockDataCollection.updateOne(
          { _id: 'mock_data_flag' },
          {
            $set: {
              completed: true,
              completedTimestamp: Math.floor(Date.now() / 1000)
            }
          },
          { session }
        );

        logger.info('Successfully populated mock data');
      });
    } catch (error) {
      logger.error('Failed to populate mock data during transaction:', error);

      // Mark the flag as failed so we can retry next time
      try {
        await mockDataCollection.updateOne(
          { _id: 'mock_data_flag' },
          {
            $set: {
              failed: true,
              failedTimestamp: Math.floor(Date.now() / 1000),
              error: error.toString()
            }
          }
        );
      } catch (updateError) {
        logger.error('Failed to update error state:', updateError);
      }

      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    // Handle DuplicateKey errors gracefully - this means another process beat us to it
    if (error.code === 11000) {
      logger.info('Another process is handling population, skipping');
      return;
    }

    logger.error('Failed to initialize mock data population:', error);
    throw error;
  }
}



export default populate_with_mock_data;