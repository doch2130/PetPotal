
const { Sequelize } = require("sequelize");
const config = require("./sequelize.json");

const sequelize = new Sequelize(config.database, config.username, config.password, config );

sequelize.sync({ force: false})
    .then(() => {
        console.info("Sequelize connect to MySQL Success");
    })
    .catch((err) => {
        console.error("Sequelize connect to MySQL Failure\n", err);
    })

module.exports = sequelize;

// sequelize.authenticate((err) => {
//     if(err) throw err;
//     console.log("Sequelize connected");
// });
// module.exports = sequelize;