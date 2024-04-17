import { useState } from "react";
import CreateOrderForm from "../components/CreateOrderForm";
import OrdersTable from "../components/OrdersTable";

export default function Order() {
  const [wasCreatedOrder, setWasCreatedOrder] = useState(false);

  return (
    <>
      <CreateOrderForm setWasCreatedOrder={setWasCreatedOrder}/>
      <OrdersTable wasCreatedOrder={wasCreatedOrder} setWasCreatedOrder={setWasCreatedOrder}/>
    </>
  );
}
