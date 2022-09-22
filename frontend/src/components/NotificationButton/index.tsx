import axios from 'axios';
import { toast } from 'react-toastify';
import icon from '../../assets/img/notification-icon.svg';
import { BASE_URL } from '../../utils/request';
import './styles.css';

type Props = {
  saleId: number;
  sallerName: string;
};
function handleClick(id: number, sallerName: string) {
  axios(`${BASE_URL}/sales/${id}/notification`).then((response) => {
    toast.info(`SMS enviado para o vendedor/a ${sallerName} com sucesso!`);
  });
}

function NotificationButton({ saleId, sallerName }: Props) {
  return (
    <div
      className=" dsmeta-red-btn "
      onClick={() => handleClick(saleId, sallerName)}
    >
      <img src={icon} alt=" Notificar " />
    </div>
  );
}

export default NotificationButton;
