import { Service } from '@rxdi/core';

@Service()
export class ExampleService {

    data: string;
    toggler: boolean;

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
    }

    toggle() {
        this.toggler = !this.toggler;
    }
}