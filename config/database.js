const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgresql://neondb_owner:AnkjtO2TGeI0@ep-flat-snow-a5vplrox.us-east-2.aws.neon.tech/neondb?sslmode=require', {
  dialect: 'postgres',
  ssl: true,  
  dialectOptions: {
    ssl: {
      require: true,    
      rejectUnauthorized: false 
    }
  }
});

module.exports = sequelize;


