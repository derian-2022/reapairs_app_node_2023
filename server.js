require('dotenv').config();

const app = require('./app');

const { db } = require('./database/config');

db.authenticate()
  .then(() =>
    console.log('Database Authenticate ✔')
  )
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log('Database Synced! 😎'))
  .catch((err) => console.log(err));

const port = +process.env.PORT || 3200;
app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
