import { Module } from '@rxdi/core';
import { ComplexService1 } from './services/complex-1/complex.service';
import { ComplexService2 } from './services/complex-2/complex.service';
import { ComplexService3 } from './services/complex-3/complex.service';

@Module({
    services: [ComplexService1, ComplexService2, ComplexService3]
})
export class TestModule {}

export * from './services/complex-1/complex.service';
export * from './services/complex-2/complex.service';
export * from './services/complex-3/complex.service';