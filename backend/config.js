const {
  NODE_ENV,
  JWT_SECRET,
  MONGODB_URI,
  PORT,
} = process.env;

console.log(NODE_ENV);

const config = {
  MONGODB_URI: NODE_ENV === 'production' ? MONGODB_URI : 'mongodb://localhost:27017/mestodb',
  PORT: NODE_ENV === 'production' ? PORT : 3000,
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
};

module.exports = config;

// const {
//   MONGODB_URI = 'mongodb://localhost:27017/mestodb',
//   PORT = 3000,
//   JWT_SECRET = 'dev-secret',
// } = process.env;

// module.exports = {
//   MONGODB_URI,
//   PORT,
//   JWT_SECRET,
// };
