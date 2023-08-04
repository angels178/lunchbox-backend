const db = require("../db/dbConfig");

const getAllSnacks = async () => {
  try {
    const getSnacks = await db.any("select * from snacks");

    return getSnacks;
  } catch (error) {
    return error;
  }
};

const getSnacksById = async (id) => {
  try {
    const snack = await db.any(`select * from snacks where id = $1`, id);

    return snack;
  } catch (error) {
    return error;
  }
};

const createSnack = async (snack) => {
  try {
    const createdSnack = await db.one(
      `insert into snacks (name, url, type, released_date, rating, is_favorite) values($1, $2, $3, $4, $5, $6) returning *`,
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
      `delete from snacks where id = $1 returning *`,
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
      `update snacks set name = $1, url = $2, type = $3, released_date = $4, rating = $5, is_favorite = $6 where id = $7 returning *`,
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
