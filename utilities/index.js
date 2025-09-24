const { connectToDb } = require('../db/connect');

async function startServer(app, port) {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`Connected to database and server listening on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // Kill the server if DB connection fails
  }
}

module.exports = { startServer };