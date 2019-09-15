import { Module } from '@rxdi/core';
import { BuildController } from './build.controller';

@Module({
  controllers: [BuildController]
})
export class BuildModule {}
