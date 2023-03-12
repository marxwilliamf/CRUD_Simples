import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Cliente } from '../model/Cliente';
import { ClienteService } from '../service/service.cliente';
import { validate } from "class-validator";
import { UpdatedClient } from '../validation/updated.client';

export class ClienteController {
    private clienteService = new ClienteService();
    private clienteRepository = getRepository(Cliente);

    async create(req: Request, res: Response) {
        try {
            const cliente = new Cliente();
            cliente.nome = req.body.nome;
            cliente.email = req.body.email;
            await this.clienteService.create(cliente);
            res.status(201).send(cliente);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    async all(req: Request, res: Response) {
        try {
            const clientes = await this.clienteService.all();
            res.status(200).send(clientes);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            // Verifica se o cliente existe
            const cliente = await this.clienteService.findOne(req.params.id);
            if (!cliente) {
                return res.status(404).send({ message: "Cliente não encontrado" });
            }

            // Cria uma instância da classe de validação
            const updatedClient = new UpdatedClient();
            updatedClient.name = req.body.name;
            updatedClient.email = req.body.email;
            updatedClient.phone = req.body.phone;
            // Valida os dados
            const errors = await validate(updatedClient);
            if (errors.length > 0) {
                return res.status(400).send({ message: "Dados inválidos", errors });
            }

            // Atualiza o cliente com os dados da requisição
            const clienteAtualizado = await this.clienteService.merge(cliente, req.body);
            await this.clienteService.update(req.params.id, clienteAtualizado);

            return res.status(200).send({ message: "Cliente atualizado com sucesso",cliente: clienteAtualizado });

        } catch (error) {
            return res.status(500).send({ message: "Erro ao atualizar cliente", error });
        }
    }

    // async update(req: Request, res: Response) {
    //     try {
    //         const updatedClient = new UpdatedClient();
    //         updatedClient.name = req.body.name;
    //         updatedClient.email = req.body.email;
    //         updatedClient.phone = req.body.phone;
    //         const errors = await validate(updatedClient);
    //         if (errors.length > 0) {
    //             return res.status(400).send({ message: "Dados inválidos", errors });
    //         }
    //         await this.clienteService.update(req.params.id, req.body);
    //         return res.status(200).send({ message: "Cliente atualizado com sucesso" });
    //     } catch (error) {
    //         return res.status(500).send({ message: "Erro ao atualizar cliente", error });
    //     }
    // }


    async delete(req: Request, res: Response) {
        try {
            // Verifica se o cliente existe
            const cliente = await this.clienteService.findOne(req.params.id);
            if (!cliente) {
                return res.status(404).send({ message: "Cliente não encontrado" });
            }

            await this.clienteService.delete(cliente.id);
            
            return res.status(200).send({ message: "Cliente removido com sucesso" });

        } catch (error) {
            return res.status(500).send({ message: "Erro ao remover cliente", error });
        }
    }


}
            