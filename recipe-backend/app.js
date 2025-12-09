const express = require('express');
const app = express();
const bookmarkRoutes = require('./routes/bookmarks');

app.use(express.json()); // To parse JSON body

// Mount routes with prefix /api/v1/bookmarks
app.use( bookmarkRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
