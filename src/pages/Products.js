import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { visuallyHidden } from '@mui/utils';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react'
import Axios from 'axios'
import Modal from './Modal'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import toast from 'react-hot-toast';
import { Await } from 'react-router-dom';





function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  
  {
    id: 'product_img1',
    numeric: false,
    disablePadding: false,
    label: 'Hình ảnh',
  },
  {
    id: 'product_id',
    numeric: false,
    disablePadding: false,
    label: 'Mã sản phẩm',
  },
  {
    id: 'product_name',
    numeric: false,
    disablePadding: false,
    label: 'Tên sản phẩm',
  },
  {
    id: 'category_id',
    numeric: false,
    disablePadding: false,
    label: 'Danh mục',
  },
  {
    id: 'product_price',
    numeric: true,
    disablePadding: false,
    label: 'Giá bán',
  },
  {
    id: 'product_detail',
    numeric: true,
    disablePadding: false,
    label: 'Chi tiết',
  },
  {
    id: 'product_status',
    numeric: true,
    disablePadding: false,
    label: 'Trạng thái',
  },
  {
    id: 'product_amount',
    numeric: true,
    disablePadding: false,
    label: 'Số lượng',
  },
];




function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.product_id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


const EnhancedTableToolbar = (props) => {
  const initialState = {
    product_img1: "",
    product_id: "",
    product_name: "",
    category_id: "",
    product_price: "",
    product_detail: "",
    product_status: "",
    product_amount: "0",
  }
  
  const {numSelected, selectedItem , getDataProduct} = props;
  const [showadd, setShowAdd] = useState(false)
  const [showedit, setShowEdit] = useState(false)
  const [info, setInfo] = useState(initialState)
  const {product_id, product_name, category_id, product_price, product_detail,product_status, product_img1} = info
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const [password2, setPassword2] = useState('')
  // const [decen, setDecen] = useState('')
  // const [status, setStatus] = useState('')
  
  //const newSelected = rows.map((n) => n.taikhoan);
  const handleDelete = (event) =>
  {
    {selectedItem.map(item => 
      
      Axios.delete(`http://localhost:3002/product/delete-product/${item}`)
      
      )}
      getDataProduct();
     


  }
  const handleChangeInput = e => {
    const  {name, value} = e.target
    setInfo({...info, [name]:value})
    console.log(info); 
  }

  const uploadImage = async (e) =>
  {
    const file = e.target.files[0]
    const base64 = await convertBase64(file)
    info.product_img1 = base64
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload  = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) =>
      {
        reject(error)
      }
    })
  }

  const handleSubmitAddData = async (event) =>
  {
    /// check Data dang loi 
    //const res = Axios.post(`http://localhost:3002/account/check-username`, info.username)
    const res = await Axios.post(`http://localhost:3002/product/check-product/${info.product_id}`)
    if (res.data.check == "false")
    {
      Axios.post(`http://localhost:3002/product/add-product/`, info)
      toast.success("Them thanh cong")
    }
    else 
    {
      toast.error("Them that bai")
    }
    
    getDataProduct();
    
  }

  const handleSubmitEditData = async (event) =>
  {
    /// check Data dang loi 
    //const res = Axios.post(`http://localhost:3002/account/check-username`, info.username)
    
      Axios.patch(`http://localhost:3002/product/update-product/`, info)
      toast.success("Sua thanh cong")
    
    getDataProduct();
    
  }


  const handleGetData = (e) =>
  {
    
  } 

  const [rowsCate, setRowsCate] = useState([])
    

  useEffect(() => {
    getDataCate()
  }, []);

   const getDataCate = React.useCallback(() => {
    fetch('http://localhost:3002/category')
    .then(res => res.json())
    .then(rowsCate => {
      setRowsCate(rowsCate)
    })
   }) 

  
  
  return (
    <>
    <h1 style={{}}>QUẢN LÍ SẢN PHẨM</h1>
    

    
    {/*
    // Test base64 image
    <input 
      type="file"
      onChange={(e) => {
        uploadImage(e)
      }}
    /> */}

    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          
        </Typography>
      )}
      {numSelected == 1 && 
      (
        <>      
          <Tooltip title="Xóa">
          <IconButton>
            <DeleteIcon 

              onClick={handleDelete}

            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Chỉnh sửa">
        <IconButton onClick={() => {setShowEdit(!showedit); handleGetData()}}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      

      
        </>
      )
      }
      

{numSelected > 1 && 
      (
        <>
          <Tooltip title="Xóa">
          <IconButton>
            <DeleteIcon onClick={handleDelete}/>
          </IconButton>
        </Tooltip>
        
        </>
      ) 
      }

{numSelected == 0 && 
      (
        <>
          <Tooltip title="Thêm mới khách hàng">
          
          <Button variant='contained' style={
            {width: '80px', height: '40px'}} onClick={() => setShowAdd(!showadd)}>
              
          <IconButton>
            <AddIcon
            />
          </IconButton>
          
          
          </Button>
       
        </Tooltip>
        
        </>
      )
      }

    </Toolbar>
     {showadd && numSelected == 0 && 
      
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        textAlign: "center",
        border: "1px solid #333",
      }}
      noValidate
      autoComplete="off"
    >
      <h3>Thêm sản phẩm</h3>
      <TextField
        id="id-product-form"
        label="Mã sản phẩm"
        value={product_id}
        onChange={handleChangeInput}
        name="product_id"
      />
      <TextField
        id="name-product-form"
        label="Tên sản phẩm"
        value={product_name}
        name="product_name"
        onChange={handleChangeInput}
      />
      
      <FormControl required sx={{ m: 1, minWidth: 120 }}>
          <InputLabel >Phân quyền</InputLabel>
          <Select
            id="category-select"
            value={category_id}
            label="Quyền "
            onChange={handleChangeInput}
            name="category_id"
          >
            
            {rowsCate.map(cate => 
                <MenuItem value={cate._id}>{cate.category_name}</MenuItem>
            )}
 
          </Select>
          <FormHelperText>Bắt buộc</FormHelperText>
        </FormControl>



      <TextField
        id="price-product-form"
        label="Giá bán"
        value={product_price}
        name="product_price"
        onChange={handleChangeInput}
      />
      <TextField
        id="detail-product-form"
        label="Chi tiết"
        value={product_detail}
        name="product_detail"
        onChange={handleChangeInput}
      />
      <FormControl required sx={{ m: 1, minWidth: 120 }}>
          <InputLabel >Trạng thái</InputLabel>
          <Select
            id="status-select"
            value={product_status}
            label="Trạng thái "
            onChange={handleChangeInput}
            name="product_status"
          >
            
            <MenuItem value='0'>Hết hàng</MenuItem>
            <MenuItem value='1'>Còn hàng</MenuItem>
            <MenuItem value='2'>Hàng đang về</MenuItem>
            
          </Select>
          <FormHelperText>Required</FormHelperText>
          
        </FormControl>

    <input 
      type="file"
      onChange={(e) => {
        uploadImage(e)
      }}
    />


      
      <Button sx={{height: 53}} variant="contained" onClick={handleSubmitAddData}>Xác nhận thêm
        
      </Button>
    </Box>
      
      }

      {showedit && numSelected == 1 && 
        <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          textAlign: "center",
          border: "1px solid #333",
        }}
        noValidate
        autoComplete="off"
      >
        <h3>Sửa tài khoản</h3>
        <TextField
        id="id-product-form"
        label="Mã sản phẩm"
        value={product_id}
        onChange={handleChangeInput}
        name="product_id"
      />
      <TextField
        id="name-product-form"
        label="Tên sản phẩm"
        value={product_name}
        name="product_name"
        onChange={handleChangeInput}
      />
      
      <TextField
        id="id-category-form"
        label="Loại danh mục"
        value={category_id}
        onChange={handleChangeInput}
        name="category_id"
      />
      <TextField
        id="price-product-form"
        label="Giá bán"
        value={product_price}
        name="product_price"
        onChange={handleChangeInput}
      />
      <TextField
        id="detail-product-form"
        label="Chi tiết"
        value={product_detail}
        name="product_detail"
        onChange={handleChangeInput}
      />
      <TextField
        id="status-product-form"
        label="Trạng thái"
        value={product_status}
        name="product_status"
        onChange={handleChangeInput}
      />
      <input 
      type="file"
      onChange={(e) => {
        uploadImage(e)
      }}
    />
        <Button sx={{height: 53}} variant="contained" onClick={handleSubmitEditData}>Xác nhận sửa
          
        </Button>
      </Box>
      }
      </>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.product_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };



  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    const [rows, setRows] = useState([])

  useEffect(() => {
    getDataProduct()
  }, []);
  
  //  const getDataProduct = React.useCallback(() => {
  //   fetch('http://localhost:3002/product')
  //   .then(res => res.json())
  //   .then(rows => {
  //     const cc = [];
  //     rows.forEach(row => {
  //       cc.push({...row.product, category: row.category})
  //     })
  //     setRows(cc);
  //   })
  //  })

  const getDataProduct = React.useCallback(() => {
    fetch('http://localhost:3002/product')
    .then(res => res.json())
    .then(rows => {
      setRows(rows)
    })
   }) 

  return (
    
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        
        <EnhancedTableToolbar numSelected={selected.length} selectedItem={selected} getDataProduct={getDataProduct} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy)) 
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.product_id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.product_id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.product_id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        
                      >
                      <img style={{width: 80}} src={row.product_img1}/>
                      </TableCell>
                      <TableCell align="left">{row.product_id}</TableCell>
                      <TableCell align="left">{row.product_name}</TableCell>
                      
                      <TableCell align="right">
                        {row.category_id.category_name}
                      </TableCell>
                      <TableCell align="right">{row.product_price}</TableCell>
                      <TableCell align="right">{row.product_detail}</TableCell>
                      <TableCell align="right">{row.product_status}</TableCell>
                      <TableCell align="right">{row.product_amount}</TableCell>
                      {/* <TableCell align="right">{row.protein}</TableCell> */}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}