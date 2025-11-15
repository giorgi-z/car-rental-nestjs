import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Utils } from '../base/utils/utils.class';

const dbConfig = Utils.readModuleConfig('database');

@Module({
  imports: [
    MongooseModule.forRoot(dbConfig.mongodb.uri, dbConfig.mongodb.options),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
