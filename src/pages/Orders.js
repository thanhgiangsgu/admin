import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useState, useEffect,useCallback} from 'react'

// const history = [
//   {
//     date: '2020-01-05',
//         customerId: '11091700',
//         amount: 3,
//   },{
//         date: '2020-01-02',
//         customerId: 'Anonymous',
//         amount: 1,
//       },
// ]

// function createData(name, calories, fat, carbs, protein, price) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//     price,
//     history: [
//       {
//         date: '2020-01-05',
//         customerId: '11091700',
//         amount: 3,
//       },
      
//     ],
//   };
// }

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  console.log(row)

  
  //const [rowsOrderDetail, setRowsOrderDetail] = useState([])

  

  return (
    <React.Fragment>
      
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
       
        <TableCell align="right">{row.order_id}</TableCell>
        <TableCell align="right">{row.customer_id.customer_name}</TableCell>
        <TableCell align="right">{row.order_date}</TableCell>
        <TableCell align="right">{row.order_address}</TableCell>
        <TableCell align="right">{row.order_phone}</TableCell>
        <TableCell align="right">{row.order_method}</TableCell>
        <TableCell align="right">{row.order_note}</TableCell>
        <TableCell align="right">{row.order_total_price}</TableCell>
        <TableCell align="right">{row.order_status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.listDetails.map((detail) => (
                    <TableRow key={detail.product_id}>
                      <TableCell component="th" scope="row">
                        {detail.product_id}
                      </TableCell>
                      <TableCell>{detail.product_amount}</TableCell>
                      <TableCell align="right">{detail.od_unit_price}</TableCell>
                      <TableCell align="right">
                       {detail.od_into_money}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


const rows = [
  //createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  
];

export default function CollapsibleTable() {
  const [rowsOrder, setRowsOrder] = useState([])
  useEffect(() => {
    getOrders()
  }, []);

  const getOrders = useCallback(() => {
    fetch('http://localhost:3002/order')
      .then(res => res.json())
      .then(rowsOrder => {
        console.log(rowsOrder);
        setRowsOrder(rowsOrder)
      })
  })
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
        <TableRow>
            <TableCell />
            <TableCell>Mã đơn hàng</TableCell>
            <TableCell align="right">Tên khách hàng</TableCell>
            <TableCell align="right">Ngày đặt hàng</TableCell>
            <TableCell align="right">Địa chỉ</TableCell>
            <TableCell align="right">Số điện thoại</TableCell>
            <TableCell align="right">Phương thức</TableCell>
            <TableCell align="right">Ghi chú</TableCell>
            <TableCell align="right">Tổng tiền</TableCell>
            <TableCell align="right">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsOrder.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
