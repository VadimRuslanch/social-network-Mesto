const {
  MONGODB_URI = 'mongodb://localhost:27017/mestodb',
  PORT = 3000,
  JWT_SECRET = 'dev-secret',
} = process.env;

module.exports = {
  MONGODB_URI,
  PORT,
  JWT_SECRET,
};
