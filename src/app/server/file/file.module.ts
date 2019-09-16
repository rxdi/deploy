import { Module } from '@rxdi/core';
import { FileService } from './services/file.service';
import { FileController } from './file.controller';

@Module({
  services: [FileService],
  controllers: [FileController],
})
export class FileModule {}
