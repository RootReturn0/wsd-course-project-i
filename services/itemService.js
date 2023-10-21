import { sql } from "../database/database.js";

const addItem = async (id, name) => {
    return await sql`INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${id}, ${name})`;
}

const collectItem = async (id) => {
    return await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${id}`
}

const countItems = async () => {
    const count = await sql`SELECT COUNT(*) FROM shopping_list_items`
    return count[0].count
}

const findItemsByListId = async (listId) => {
    return await sql`SELECT * FROM shopping_list_items
    WHERE shopping_list_id = ${listId}
    ORDER BY collected, name`;
}

export { addItem, collectItem, countItems, findItemsByListId };