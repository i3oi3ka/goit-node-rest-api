import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  username: "db_contacts_u2wt_user",
  password: "Y9EpujFlxjmkgZ979xF55mGPuxcpxrPJ",
  host: "dpg-d4cfd7juibrs738qdh90-a.frankfurt-postgres.render.com",
  database: "db_contacts_u2wt",
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
