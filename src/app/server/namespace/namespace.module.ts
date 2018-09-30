import { Module } from "@rxdi/core";
import { NamespaceController } from "./namespace.controller";
import { NamespaceService } from './services/namespace.service';

@Module({
    controllers: [NamespaceController],
    services: [NamespaceService]
})
export class NamespaceModule {}