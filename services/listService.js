import { sql } from "../database/database.js";

const addList = async (name) => {
    return await sql`INSERT INTO shopping_lists (name) VALUES (${name})`
}

const countLists = async () => {
    const count = await sql`SELECT COUNT(*) FROM shopping_lists`
    return count[0].count
}

const deactivateList = async (id) => {
    return await sql`UPDATE shopping_lists SET active = false WHERE id = ${id}`
}

const findListById = async (id) => {
    const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${id}`

    if (rows && rows.length > 0) {
        return rows[0]
    }
    return { id: 0, name: "No list found" }
}

const findActiveLists = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = true`;
}

export { addList, countLists, deactivateList, findListById, findActiveLists };