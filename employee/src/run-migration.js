const { Umzug, SequelizeStorage } = require('umzug');
const Sequelize = require('sequelize');




const sequelize = new Sequelize('employee_db', 'root', '', {
  host: 'localhost',
  dialect: 'postgres',
  port:26260,
  dialectOptions: {
    SSL:{
      rejectUnauthorized:false
    }
  }
});

// const sequelize = new Sequelize('employee_db', 'root', '', {
//   host: 'cockroachdb-0',
//   port:26257,
//   dialect: 'postgres',
//   logging:false,
//   ssl:false
// });

const umzug = new Umzug({
  migrations: { glob: './migrations/employee_role_ass.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

async function migrate() {
  try {
    await umzug.up();
  } 
  catch (error) {
  }
}

migrate();