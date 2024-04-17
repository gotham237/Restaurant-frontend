import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useOrders } from "../api/useOrders";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import moment from "moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function OrdersTable({wasCreatedOrder, setWasCreatedOrder}) {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState();

  let { isLoading, orders, refetch } = useOrders();

  const handleOrdersRefresh = () => {
    console.log(123)
    if (from && to) {
      const newOrders = orders.filter(order => new Date(order.createdAt) >= from && new Date(order.createdAt) <= to);
      setFilteredOrders(newOrders);
    }
  };

  useEffect(() => {
    refetch();
    setWasCreatedOrder(false);
  }, [wasCreatedOrder]);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  console.log(orders, "orders")
  if (isLoading) return ;

  for (let order of orders) {
    order.createdAt = moment(order.createdAt).format();
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "20px",
          padding: "10px",
        }}
      >
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={setFrom}/>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={setTo}/>
          </LocalizationProvider>
          <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2, ml:2 }} onClick={handleOrdersRefresh}>
            FILTER
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>id</StyledTableCell>
              <StyledTableCell align="right">price</StyledTableCell>
              <StyledTableCell align="right">customer name</StyledTableCell>
              <StyledTableCell align="right">customer email</StyledTableCell>
              <StyledTableCell align="right">created_at</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders && filteredOrders.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.customerName}
                </StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.createdAt}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
