import axios from 'axios';
import { toast } from 'react-toastify';
import delecon from '../../assets/img/botao-apagar.png';
import { BASE_URL } from '../../utils/request';
import './styles.css';

type Props = {
  saleId: number;
  sallerName: string;
};
function handleClick(id: number, sallerName: string) {
  axios.delete(`${BASE_URL}/sales/${id}/delete`).then((response) => {
    if (sallerName && id) {
      return toast.info(
        `Vendedor/a ${sallerName} Excluido com Sucesso Atualize a Pagina!`
      );
    }
  });
}

function DeleteButton({ saleId, sallerName }: Props) {
  return (
    <div
      className=" buttonDelete "
      onClick={() => handleClick(saleId, sallerName)}
    >
      <img src={delecon} alt=" Deletar" />
    </div>
  );
}

export default DeleteButton;
