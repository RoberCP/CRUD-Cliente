import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import ClienteService from '@/services/clienteService';

interface ClienteData {
    nome_cliente: string;
    email: string;
    data_nascimento: string;
}

const Registrar = () => {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const [itemData, setItemData] = useState<ClienteData | null>(null);
    const [formData, setFormData] = useState<ClienteData>({
        nome_cliente: '',
        email: '',
        data_nascimento: '',
    });

    useEffect(() => {
        if (itemId) {
            ClienteService.getCliente(itemId)
                .then((data: ClienteData) => {
                    setItemData(data);
                    setFormData(data);
                })
                .catch(error => console.error('Erro ao carregar cliente:', error));
        }
    }, [itemId]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission

        try {
            await ClienteService.updateCliente(itemId, formData);
            console.log('Cliente atualizado com sucesso.');
            // Você pode adicionar uma mensagem de sucesso aqui, se desejar.
            navigate('/listar');
        } catch (error) {
            console.error('Erro ao atualizar o cliente:', error);
            // Adicione um tratamento de erro adequado aqui.
        }
    }

    if (!itemData) {
        return <h4>Carregando</h4>;
    }

    return (
        <div className="formulario">
            <h2>Atualizar Cliente</h2>
            <Form onSubmit={handleSubmit} className="formulario">
                <Form.Group className="mb-3">
                    <Form.Label>Nome Cliente</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nome Cliente"
                        id="nome_cliente"
                        name="nome_cliente"
                        value={formData.nome_cliente}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
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
                            <Form.Label>Data Nascimento</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Data de Nascimento"
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
                        <Button type="submit">Atualizar</Button>
                        <Button onClick={() => navigate('/')}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Registrar;
