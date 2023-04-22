require('dotenv').config();

const app = require('./app');

const { db } = require('./database/config');
const initModel = require('./models/initmodels');

db.authenticate()
  .then(() =>
    console.log('Database Authenticate ✔')
  )
  .catch((err) => console.log(err));

initModel()

db.sync()
  .then(() => console.log('Database Synced! 😎'))
  .catch((err) => console.log(err));

const port = +process.env.PORT || 3200;
app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
