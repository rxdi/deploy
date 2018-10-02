declare module 'test33/services/complex-1/complex.service' {
	export class ComplexService1 {
	}

}
declare module 'test33/services/complex-2/complex.service' {
	export class ComplexService2 {
	}

}
declare module 'test33/services/complex-3/complex.service' {
	export class ComplexService3 {
	    complex(): void;
	    complex2(): void;
	    complex3(): void;
	    complex4(): void;
	    complex5(): void;
	    complex6(): void;
	    complex7(): void;
	    complex8(): void;
	    complex9(): void;
	}

}
declare module 'test33' {
	export class TestModule {
	}
	export * from 'test33/services/complex-1/complex.service';
	export * from 'test33/services/complex-2/complex.service';
	export * from 'test33/services/complex-3/complex.service';

}
