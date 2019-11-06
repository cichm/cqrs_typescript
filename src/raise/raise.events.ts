import {IRaiseInterface} from "./raise.interface";

export class RaiseEventsPostponed {
    constructor(
        public readonly raise: IRaiseInterface
    ){}
}
