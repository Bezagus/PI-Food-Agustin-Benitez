const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const DietsService = require('./src/service/service.diets.js')

const dietsApi = new DietsService

conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001');
  });
  dietsApi.getDietsApi()
});
