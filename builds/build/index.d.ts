declare module 'dadad3/services/example.service' {
	export class ExampleService {
	    data: string;
	    toggler: boolean;
	    getData(): string;
	    setData(data: any): void;
	    toggle(): void;
	}

}
declare module 'dadad3/services/index' {
	export * from 'dadad3/services/example.service';

}
declare module 'dadad3' {
	export class TestModule {
	}
	export * from 'dadad3/services/index';

}
