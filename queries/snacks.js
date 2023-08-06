const db = require("../db/dbConfig");

const getAllSnacks = async () => {
  try {
    const getSnacks = await db.any(`SELECT * FROM snacks`);

    return getSnacks;
  } catch (error) {
    return error;
  }
};

const getSnacksById = async (id) => {
  try {
    const snack = await db.any(`SELECT * FROM snacks WHERE id = $1`, id);

    return snack;
  } catch (error) {
    return error;
  }
};

const createSnack = async (snack) => {
  try {
    const createdSnack = await db.one(
      `INSERT INTO snacks (name, url, type, released_date, rating, is_favorite) VALUES($1, $2, $3, $4, $5, $6) returning *`,
      [
        snack.name,
        snack.url,
        snack.type,
        snack.released_date,
        snack.rating,
        snack.is_favorite,
      ]
    );

    return createdSnack;
  } catch (error) {
    return error;
  }
};

const deleteSnackById = async (id) => {
  try {
    const deletedSnack = await db.any(
      `DELETE FROM snacks WHERE id = $1 RETURNING *`,
      id
    );

    return deletedSnack;
  } catch (error) {
    return error;
  }
};

const updateSnack = async (id, snack) => {
  try {
    const updatedSnack = await db.any(
      `UPDATE snacks SET name = $1, url = $2, type = $3, released_date = $4, rating = $5, is_favorite = $6 WHERE id = $7 RETURNING *`,
      [
        snack.name,
        snack.url,
        snack.type,
        snack.released_date,
        snack.rating,
        snack.is_favorite,
        id,
      ]
    );

    return updatedSnack;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllSnacks,
  getSnacksById,
  createSnack,
  deleteSnackById,
  updateSnack,
};
