import { Module } from "@rxdi/core";
import { BehaviorSubject } from "rxjs";
import { START, FILE_DEPLOYMENT_STATUS, FILE_DEPLOYMENT_STATUS_INTERFACE } from './status-injection.tokens';
import { StatusService } from './status.service';

@Module({
    services: [
        StatusService,
        {
            provide: START,
            useValue: new BehaviorSubject(true)
        },
        {
            provide: FILE_DEPLOYMENT_STATUS,
            useValue: new BehaviorSubject(<FILE_DEPLOYMENT_STATUS_INTERFACE>{
                file: 'SUCCESS',
                typings: 'SUCCESS',
                module: 'SUCCESS'
            })
        }
    ]
})
export class StatusModule {}