import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {RaiseRepository} from "./raise.repository";

export class GetRaiseQuery {}

@QueryHandler(GetRaiseQuery)
export class GetRaiseHandler implements IQueryHandler<GetRaiseQuery> {
    constructor(private readonly repository: RaiseRepository) {}

    async execute(query: GetRaiseQuery) {
        return this.repository.getAll();
    }
}
