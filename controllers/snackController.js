const express = require("express");
const router = express.Router();

const {
  getAllSnacks,
  getSnacksById,
  createSnack,
  deleteSnackById,
  updateSnack,
} = require("../queries/snacks");

const { checkRequest } = require("../validations/checkSnacks");

router.get("/", async (req, res) => {
  const snacks = await getAllSnacks();

  if (!Array.isArray(snacks)) {
    res.status(500).json({ error: "Server error!" });
  } else {
    res.json(snacks);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const snack = await getSnacksById(id);

  if (snack.length === 0) {
    res.status(404).json({ error: "Snack not found!" });
  } else {
    res.json(snack[0]);
  }
});

router.post("/", checkRequest, async (req, res) => {
  const createdSnack = await createSnack(req.body);

  res.json(createdSnack);
});

router.delete("/:id", async (req, res) => {
  const deletedSnack = await deleteSnackById(req.params.id);

  if (deletedSnack.length === 0) {
    return res.status(404).json({ error: "Snack not found!" });
  } else {
    return res.json(deletedSnack[0]);
  }
});

router.put("/:id", checkRequest, async (req, res) => {
  const updatedSnack = await updateSnack(req.params.id, req.body);

  if (updatedSnack.length === 0) {
    return res
      .status(404)
      .json({ error: true, message: "Update is not found!" });
  } else {
    return res.json(updatedSnack[0]);
  }
});

module.exports = router;
