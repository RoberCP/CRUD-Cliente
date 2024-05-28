import React, { useState, ChangeEvent, FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import ClienteService from '@/services/clienteService';

interface ClienteData {
    nome_cliente: string;
    email: string;
    data_nascimento: string;
}

const Registrar = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ClienteData>({
        nome_cliente: '',
        email: '',
        data_nascimento: '',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission

        try {
            await ClienteService.addCliente(formData);
            console.log('Cliente adicionado:', formData);
            setFormData({
                nome_cliente: '',
                email: '',
                data_nascimento: '',
            });
            navigate('/listar'); // Navegar para a lista de clientes após o registro bem-sucedido
        } catch (error) {
            console.error('Erro ao adicionar o cliente:', error);
        }
    };

    return (
        <div className="formulario">
            <h2>Adicionar Cliente</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nome"
                        id="nome_cliente"
                        name="nome_cliente"
                        value={formData.nome_cliente}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control
                                type="date"
                                id="data_nascimento"
                                name="data_nascimento"
                                value={formData.data_nascimento}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="buttons">
                        <Button type="submit">Registrar</Button>
                        <Button type="button" onClick={() => navigate('/')}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Registrar;
