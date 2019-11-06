import { Injectable } from "@nestjs/common";
import { IRaiseInterface } from "./raise.interface";
import { RaiseModel } from "./raise.model";

@Injectable()
export class RaiseRepository {
    async getActionById(id: string) {

        // fetch it from database for example

        const raise: IRaiseInterface = {
            id,
            started: new Date()
        };

        return new RaiseModel(raise);
    }

    async getAll() {
        return [];
    }
}
