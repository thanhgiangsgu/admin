import * as React from 'react';
import { BrowserRouter, Link } from 'react-router-dom'
import { Routes, Route }  from 'react-router-dom'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Accordion } from '@mui/material';

export const mainListItems = (
  <React.Fragment>
    {/* <BrowserRouter>
      <Routes> */}
    <ListItemButton Link to={'overview'}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Tổng quan" />
    </ListItemButton>
    <ListItemButton Link to={'orders'}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Đơn hàng" />
    </ListItemButton>
   
    <ListItemButton Link to={'customers'}>
      
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Khách hàng" />

    </ListItemButton>
   
    <ListItemButton Link to={'report'}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Báo cáo" />
    </ListItemButton>
    <ListItemButton Link to={'products'}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Sản phẩm" />
    </ListItemButton>

    <ListItemButton Link to={'account'}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Tài khoản" />
    </ListItemButton>

    <ListItemButton Link to={'category'}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Danh mục" />
    </ListItemButton>

    <ListItemButton Link to={'buyorder'}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Phiếu xuất" />
    </ListItemButton>
      {/* </Routes>
    </BrowserRouter> */}
  </React.Fragment>
);

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </React.Fragment>
// );