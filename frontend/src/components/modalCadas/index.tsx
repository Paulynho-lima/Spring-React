import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Button,
  Form,
  Label,
  Input,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { BASE_URL } from '../../utils/request';
import './styles.css';

function RegisterModalSale() {
  const [show, setShow] = useState(false);
  const [reset, setReset] = useState({
    sellerName: '',
    date: '',
    visited: '',
    deals: '',
    amount: '',
  });

  const resetForm = () => {
    setReset({ sellerName: '', date: '', visited: '', deals: '', amount: '' });
  };

  const hamdleModel = () => {
    setShow(true);
  };

  const hamdleCloseModel = () => {
    setShow(false);
  };

  const createSale = async (data: object) => {
    await axios
      .post(`${BASE_URL}/sales/saleSave`, data)
      .then((response) => {
        toast.info(
          `Vendedor/a ${response.data.sellerName} Cadastrado com Sucesso Atualize a Pagina!`
        );
      })
      .catch((err) => console.log(err.message));
  };
  const onSubmitSales = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await createSale({
      sellerName: reset.sellerName,
      date: reset.date,
      visited: reset.visited,
      deals: reset.deals,
      amount: reset.amount,
    });
  };

  return (
    <>
      <div className="buttonRegister">
        <Button size="lg" outline color="info" onClick={() => hamdleModel()}>
          Cadastar Nova Venda
        </Button>
      </div>

      <Modal isOpen={show} onRequestClose={hamdleCloseModel}>
        <ModalHeader className="header" closeButton>
          <h2>Cadastrar uma nova venda</h2>
        </ModalHeader>

        <ModalBody className="modalbody">
          <Form id="modalForm">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <div className="nameSale">
                <Label form="name" className="nameLabel">
                  Nome do Vendedor
                </Label>
                <Input
                  value={reset.sellerName}
                  onChange={({ target }) =>
                    setReset({ ...reset, sellerName: target.value })
                  }
                  type={'text'}
                  className="inputName"
                  id="name"
                />
              </div>

              <div className="dateSale">
                <Label form="date" className="dateLabel">
                  Data da venda
                </Label>
                <Input
                  value={reset.date}
                  onChange={({ target }) =>
                    setReset({ ...reset, date: target.value })
                  }
                  type={'date'}
                  className="inputDate"
                  id="date"
                />
              </div>

              <div className="visitSale">
                <Label form="visited" className="dateLabel">
                  Numeros de visitas
                </Label>
                <Input
                  value={reset.visited}
                  onChange={({ target }) =>
                    setReset({ ...reset, visited: target.value })
                  }
                  type={'number'}
                  className="inputvisit"
                  id="visited"
                />
              </div>

              <div className="dealsSale">
                <Label form="deals" className="dealsLabel">
                  Numeros de vendas
                </Label>
                <Input
                  value={reset.deals}
                  onChange={({ target }) =>
                    setReset({ ...reset, deals: target.value })
                  }
                  type={'number'}
                  className="inputDeals"
                  id="deals"
                />
              </div>

              <div className="amountSale">
                <Label form="amount" className="amountLabel">
                  Valor Total R$
                </Label>
                <Input
                  value={reset.amount}
                  onChange={({ target }) =>
                    setReset({ ...reset, amount: target.value })
                  }
                  type={'number'}
                  className="inputAmount"
                  id="amount"
                />
              </div>
            </FormGroup>
          </Form>
        </ModalBody>

        <ModalFooter className="footer">
          <Button
            onClick={(e) => onSubmitSales(e)}
            outline
            color="success"
            size="lg"
          >
            Cadastrar
          </Button>

          <Button onClick={() => resetForm()} outline color="primary" size="lg">
            Novo Cadastro
          </Button>

          <Button
            onClick={() => hamdleCloseModel()}
            outline
            color="info"
            size="lg"
          >
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default RegisterModalSale;
