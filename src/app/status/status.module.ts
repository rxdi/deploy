import { Module } from "@rxdi/core";
import { BehaviorSubject } from "rxjs";
import { START, FILE_DEPLOYMENT_STATUS } from './status-injection.tokens';

@Module({
    services: [
        {
            provide: START,
            useValue: new BehaviorSubject(true)
        },
        {
            provide: FILE_DEPLOYMENT_STATUS,
            useValue: new BehaviorSubject({
                file: true,
                typings: true,
                module: true
            })
        }
    ]
})
export class StatusModule {}