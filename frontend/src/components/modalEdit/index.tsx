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
import icone from '../../assets/img/editar-informacao.png';
import './styles.css';

type Props = {
  id: number;
  sallerName: string;
  date: string;
  visited?: number | string;
  deals?: number | string;
  amount?: number | string;
};

function EditModalSale({
  id,
  sallerName,
  date,
  visited,
  deals,
  amount,
}: Props) {
  const [show, setShow] = useState(false);
  const [reset, setReset] = useState({
    id: id,
    sellerName: sallerName,
    date: date,
    visited: visited,
    deals: deals,
    amount: amount,
  });

  const hamdleModel = () => {
    setShow(true);
  };

  const hamdleCloseModel = () => {
    setShow(false);
  };

  const upDateSale = async (data: object) => {
    await axios
      .put(`${BASE_URL}/sales/update`, data)
      .then((response) => {
        toast.info(
          `Vendedor/a ${response.data.sellerName} Editado com sucesso!`
        );
      })
      .catch((err) => console.log(err.message));
  };
  const onSubmitSales = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await upDateSale({
      id: reset.id,
      sellerName: reset.sellerName,
      date: reset.date,
      visited: reset.visited,
      deals: reset.deals,
      amount: reset.amount,
    });
    hamdleCloseModel();
  };

  return (
    <>
      <div className="butonshow">
        <button className="buttonRegiste" onClick={() => hamdleModel()}>
          <img src={icone} alt=" Editar " />
        </button>
      </div>

      <Modal isOpen={show} onRequestClose={hamdleCloseModel}>
        <ModalHeader className="header" closeButton>
          <h2>Editar Venda</h2>
        </ModalHeader>

        <ModalBody className="modalbody">
          <Form id="modalForm">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <div className="idSale">
                <Label form="idSale" className="idLabel">
                  ID da Venda
                </Label>
                <Input
                  value={id}
                  type={'text'}
                  className="inputName"
                  id="idSale"
                  readOnly
                />
              </div>
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
            Editar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default EditModalSale;
