const checkRequest = (req, res, next) => {
  const { name, url, is_favorite } = req.body;

  if (
    (!name && url.substring(0, 7) === "http://") ||
    (url.substring(0, 8) === "https://" && typeof is_favorite !== "boolean")
  ) {
    res.status(404).json({ error: "Please check the requirements!" });
  } else {
    next();
  }
};

module.exports = {
  checkRequest,
};
