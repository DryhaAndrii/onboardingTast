import { useNavigate } from "react-router-dom";

import { ContainerOrderInfoStyled } from "../styled/styledOrderInfo";

import { selectOrderById } from "../redux/ducks/orders";
import { useAppSelector } from "../redux/rootReducer";

export function OrderInfo() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const order = useAppSelector(selectOrderById(id || ""));
  const navigate = useNavigate();

  const buttonHandler = () => {
    navigate("/");
  };

  const getFormattedDate = (date: string) => {
    return new Intl.DateTimeFormat("eu", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  return (
    <ContainerOrderInfoStyled>
      <div>
        {order && (
          <>
            <p>Client: {order.name}</p>
            <p>Date: {getFormattedDate(order.date)}</p>
            <p>Price: {order.price}</p>
            <p>Status: {order.status}</p>
            <p>Info: {order.info}</p>
          </>
        )}

        <button onClick={buttonHandler}>Go back</button>
      </div>
    </ContainerOrderInfoStyled>
  );
}
