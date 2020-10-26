import { Logger } from '@nestjs/common';
import { Console } from 'console';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/user/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 's56U9555',
        database: 'forum',
      });
      sequelize.addModels([User]);
      await sequelize.sync()
      .then(() => console.log("Connect db"))
      .catch(() => {
          throw "connection error";
      });
      return sequelize;
    },
  },
];