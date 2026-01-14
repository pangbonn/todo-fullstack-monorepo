require('dotenv').config();
const app = require('./app');
const { getDatabase } = require('./utils/database');

const PORT = process.env.PORT || 5000;

// Initialize database
getDatabase();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/v1/health`);
});
