import { Module } from '@rxdi/core';
import { ExampleService } from './services/example.service';

@Module({
    services: [ExampleService]
})
export class TestModule {}

export * from './services/index';