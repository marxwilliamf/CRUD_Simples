import { Cliente } from '../model/Cliente';
import { FindOptionsUtils, getRepository } from 'typeorm';

export class ClienteService {

    private clienteRepository = getRepository(Cliente);

    async create(cliente: Cliente): Promise<void> {
        try {
            await this.clienteRepository.save(cliente);
        } catch (error) {
            throw new Error('Erro ao salvar o cliente');
        }
    }

    async all() {
        try {
            return await this.clienteRepository.find();
        } catch (error) {
            throw new Error('Erro ao recuperar clientes');
        }
    }

    
    async findOne(id: number) {
        try {
            const client = new Cliente();
            client.id = id
            const cliente = await this.clienteRepository.findOne({ where: {id : client.id}});
            if (!cliente) {
                throw new Error("Cliente não encontrado");
            }
            return cliente;
        } catch (error) {
            throw new Error("Erro ao recuperar cliente: " + error);
        }
    }




    async update(id: number, cliente: Cliente) {
        try {
            const client = new Cliente();
            client.id = id
            const clienteToUpdate = await this.clienteRepository.findOne({ where: {id : cliente.id}});
            if (!clienteToUpdate) {
                throw new Error('Cliente não encontrado');
            }
            this.clienteRepository.merge(clienteToUpdate, cliente);
            return await this.clienteRepository.save(clienteToUpdate);
        } catch (error) {
            throw new Error('Erro ao atualizar cliente');
        }
    }

    async merge(client: Cliente, data: any): Promise<Cliente> {
        try {
            // Merge dos dados
            Object.assign(client, data);
            return client;
        } catch (error) {
            throw new Error(`Erro ao mesclar cliente: ${error.message}`);
        }
    }
    

    async delete(id: number) {
        try {
            const client = new Cliente();
            client.id = id
            const cliente = await this.clienteRepository.findOne({ where: {id : client.id}});
            if (!cliente) {
                throw new Error('Cliente não encontrado');
            }
            await this.clienteRepository.remove(cliente);
        } catch (error) {
            throw new Error('Erro ao remover cliente');
        }
    }
}
