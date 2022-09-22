
import { useState } from 'react';
import { Button, Form, Label, Input, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './styles.css';

function RegisterModalSale() {
    const [show, setShow] = useState(false)

    const hamdleModel = () => {
        setShow(true)
    }

    const hamdleCloseModel = () => {
        setShow(false)
    }

    return(
    
        <>
            <div className='buttonRegister'>
                <Button size="lg" outline color="info" onClick={() => hamdleModel()}>Cadastar Nova Venda</Button>
            </div>
           
            <Modal isOpen={show} onRequestClose={hamdleCloseModel}>
                <ModalHeader className='header' closeButton>
        
                    <h2>Cadastrar uma nova venda</h2>
            
                </ModalHeader>

                <ModalBody className='modalbody'>
                    <Form>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <div className='nameSale'>
                            <Label form='name' className='nameLabel'>Nome do Vendedor</Label>
                            <Input type={'text'} className='inputName' id='name'/>
                        </div>

                        <div className='dateSale'>
                            <Label form='date' className='dateLabel'>Data da venda</Label>
                            <Input type={'date'} className='inputDate' id='date'/>
                        </div>

                        <div className='visitSale'>
                            <Label form='visited' className='dateLabel'>Numeros de visitas</Label>
                            <Input type={'number'} className='inputvisit' id='visited'/>
                        </div>

                        <div className='dealsSale'>
                            <Label form='deals' className='dealsLabel'>Numeros de vendas</Label>
                            <Input type={'number'} className='inputDeals' id='deals'/>
                        </div>

                        <div className='amountSale'>
                            <Label form='amount' className='amountLabel'>Valor Total de vendas</Label>
                            <Input type={'number'} className='inputAmount' id='amount'/>
                        </div>
                        </FormGroup>
                    </Form>
                </ModalBody>

                <ModalFooter className='footer'>
                    <Button outline color="success" size="lg">
                        Cadastrar
                    </Button>
                    <Button onClick={() =>hamdleCloseModel()} outline color="info" size="lg">
                        Fechar
                    </Button>
                </ModalFooter>
            </Modal>
        </>

    )

}

export default RegisterModalSale;