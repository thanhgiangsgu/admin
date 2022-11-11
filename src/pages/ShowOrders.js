import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useState, useEffect } from 'react'
import { axios } from 'axios'
import dataOrder from '..'

// Generate Order Data



function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() { 
  const [rows, setRows] = useState([])

  useEffect(() => {
    fetch('http://localhost:3002/order')
    .then(res => res.json())
    .then(rows => {
      setRows(rows)
    })
    
  }, []);
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      
   
      <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Mã hóa đơn</TableCell>
          <TableCell>Tên khách hàng</TableCell>
          <TableCell>Địa chỉ</TableCell>
          <TableCell>Số điện thoại</TableCell>
          <TableCell>Ghi chú</TableCell>
          <TableCell>Ngày đặt hàng</TableCell>
          <TableCell>Trạng thái</TableCell>
          <TableCell align="right">Tổng tiền</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        
        {rows.map((row) => (
          <TableRow key={row._id} >
            <TableCell>{row.id_hoadon}</TableCell>
            <TableCell>{row.id_khachhang}</TableCell>
            <TableCell>{row.diachi}</TableCell>
            <TableCell>{row.sodienthoai}</TableCell>
            <TableCell>{row.ghichu}</TableCell>
            <TableCell>{row.ngay_dat_hang}</TableCell>
            <TableCell>{row.trangthai ? "True" : "False"}</TableCell>
            <TableCell align="right">{`$${row.tongtien}`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    
      
      <Link color="primary" href="/Orders" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}