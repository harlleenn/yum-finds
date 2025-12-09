const db = require('../database/bookmarks'); // your database connection

// Get all bookmarks
exports.getBookmarks = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM bookmarks");
    res.status(200).json({
      success: true,
      data: rows
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Delete a bookmark by id (assuming id is primary key)
exports.deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute("DELETE FROM bookmarks WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Bookmark not found' });
    }

    res.status(200).json({
      success: true,
      message: `Bookmark with id ${id} deleted`
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update a bookmark by id
exports.updateBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const { idMeal, name, area, image } = req.body;

    const [result] = await db.execute(
      `UPDATE bookmarks SET idMeal = ?, name = ?, area = ?, image = ? WHERE id = ?`,
      [idMeal, name, area, image, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Bookmark not found' });
    }

    res.status(200).json({
      success: true,
      message: `Bookmark with id ${id} updated`
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
