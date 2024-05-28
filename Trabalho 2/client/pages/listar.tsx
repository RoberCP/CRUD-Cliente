import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ClienteService from '@/services/clienteService';

interface Cliente {
  id: string;
  nome_cliente: string;
  email: string;
  data_nascimento: string;
}

const ListarClientes = () => {
  const [clientes, setClientes] = useState<Cliente[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    ClienteService.getClientes()
      .then((data) => {
        setClientes(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Erro ao listar clientes:', error);
        setError('Erro ao carregar a lista de clientes.');
      });
  }, []);

  const handleRemove = async (id: string) => {
    try {
      await ClienteService.deleteCliente(id);
      if (clientes) {
        setClientes(clientes.filter((cliente) => cliente.id !== id));
      }
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      setError('Erro ao deletar o cliente.');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!clientes) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h3>Lista de Clientes</h3>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nome_cliente}</td>
              <td>{cliente.email}</td>
              <td>{cliente.data_nascimento}</td>
              <td>
                <Button
                  onClick={() => navigate(`/atualizar/${cliente.id}`)}
                  aria-label={`Editar cliente ${cliente.nome_cliente}`}
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                >
                  <FaEdit />
                </Button>
                <Button
                  onClick={() => handleRemove(cliente.id)}
                  aria-label={`Excluir cliente ${cliente.nome_cliente}`}
                  variant="outline-danger"
                  size="sm"
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListarClientes;
