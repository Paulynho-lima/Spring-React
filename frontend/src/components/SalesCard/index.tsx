import NotificationButton from '../NotificationButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/request';
import { Sale } from '../../models/sale';
import RegisterModalSale from '../modalCadas';
import EditModalSale from '../modalEdit';
import DeleteButton from '../deleteButton';

function SalesCard() {
  const dateMin = new Date(new Date().setDate(new Date().getDate() - 365));
  const [minDate, setMinDate] = useState(dateMin);
  const [maxDate, setMaxDate] = useState(new Date());

  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const dateMin = minDate.toISOString().slice(0, 10);
    const dateMax = maxDate.toISOString().slice(0, 10);
    const DOMAIN = `/sales?minDate=${dateMin}&maxDate=${dateMax}`;

    axios.get(`${BASE_URL}${DOMAIN}`).then((response) => {
      setSales(response.data.content);
    });
  }, [minDate, maxDate]);

  return (
    <div className="dsmeta-card">
      <h2 className="dsmeta-sales-title">Vendas</h2>
      <div>
        <RegisterModalSale />
        <div className="dsmeta-form-control-container">
          <DatePicker
            selected={minDate}
            onChange={(date: Date) => setMinDate(date)}
            className="dsmeta-form-control"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="dsmeta-form-control-container">
          <DatePicker
            selected={maxDate}
            onChange={(date: Date) => setMaxDate(date)}
            className="dsmeta-form-control"
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      <div>
        <table className="dsmeta-sales-table">
          <thead>
            <tr className="trtable">
              <th className="show992">ID</th>
              <th className="show576">Data</th>
              <th>Vendedor</th>
              <th className="show992">Visitas</th>
              <th className="show992">Vendas</th>
              <th>Total</th>
              <th>Notificar</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => {
              return (
                <tr key={sale.id}>
                  <td className="show992">{sale.id}</td>
                  <td className="show576">
                    {new Date(
                      new Date().setDate(new Date(sale.date).getDate() + 1)
                    ).toLocaleDateString('en-US')}
                  </td>
                  <td>{sale.sellerName}</td>
                  <td className="show992">{sale.visited}</td>
                  <td className="show992">{sale.deals}</td>
                  <td>R$ {sale.amount.toFixed(2)}</td>
                  <td>
                    <div className="dsmeta-red-btn-container">
                      <NotificationButton
                        saleId={sale.id}
                        sallerName={sale.sellerName}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="dsmeta-red-btn-container">
                      <EditModalSale
                        id={sale.id}
                        sallerName={sale.sellerName}
                        date={sale.date}
                        visited={sale.visited}
                        deals={sale.visited}
                        amount={sale.amount}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="dsmeta-red-btn-container">
                      <DeleteButton
                        saleId={sale.id}
                        sallerName={sale.sellerName}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesCard;
