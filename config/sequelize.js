const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
   database: 'eduwork-crud-v2',
   host: 'localhost',
   username: 'root',
   password: 'root',
   dialect: 'mysql' 
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('connection success!');
    } catch (error) {
        console.error('unable to connect the database', error);
    }
})();

module.exports = sequelize;