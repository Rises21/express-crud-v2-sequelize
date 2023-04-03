const {Sequelize} = require('sequelize');

// const sequelize = new Sequelize({
//    database: 'eduwork-crud-v2',
//    host: 'localhost',
//    username: 'root',
//    password: 'root',
//    dialect: 'mysql' 
// });


//using freesqldatabase for deploy
const sequelize = new Sequelize({
   database: 'sql12610471',
   host: 'sql12.freesqldatabase.com',
   username: 'sql12610471',
   password: 'qNBEaM87TT',
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