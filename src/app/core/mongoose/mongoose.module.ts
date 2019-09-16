import { Module } from '@gapi/core';
import { connect, connection } from 'mongoose';

const host = process.env.MONGO_HOST || 'localhost';
const database = process.env.MONGO_DATABASE || 'test';

@Module({})
export class MongooseModule {
  public static forRoot() {
    return {
      module: MongooseModule,
      providers: [
        {
          provide: 'mongoose-connection-token',
          lazy: true,
          useFactory: async () => {
            return new Promise((resolve, reject) => {
              connect(
                `mongodb://${host}/${database}`,
                {
                  useNewUrlParser: true,
                  pass: process.env.MONGO_PASSWORD || '',
                  user: process.env.MONGO_USERNAME || '',
                }
              );
              connection.on('error', e => reject(e));
              connection.once('open', function() {
                resolve();
              });
            });
          },
        },
      ],
    };
  }
}
