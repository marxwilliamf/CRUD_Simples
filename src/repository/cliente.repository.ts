import { Repository, FindManyOptions } from 'typeorm';
import { Cliente } from '../model/Cliente';

export class ClienteRepository extends Repository<Cliente> {
    async findAll(options: FindManyOptions, page: number, limit: number) {
        options.skip = (page - 1) * limit;
        options.take = limit;
        return this.find(options);
    }
}