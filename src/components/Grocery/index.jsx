import React,{useEffect, useState} from 'react'
import '../styles/newForm.css'
import { useNavigate } from 'react-router-dom';
import {Box, Button, Grid,Table,
        TableBody,TableCell,TableContainer,
        TableHead,TableRow,Paper }
        from "@mui/material";
import axios from 'axios'
import PropTypes from 'prop-types';


const getGroceryURL = `${process.env.REACT_APP_API_KEY}/getProductData`;
const DeletegetGroceryURL = `${process.env.REACT_APP_API_KEY}/deleteProductData?code=`;


const ModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};



function Grocery() {

  const navigate =useNavigate()

  const [groceryItemsPerPage, setGroceryItemsPerPage] = useState(2);
  const [groceryPerPage, setGroceryPerPage] = useState(1);
  const [groceryNoOfPages, setGroceryNoOfPages] = useState()

  const[records,setRecords]=useState([])
  const[selectedRow,setSelectedRow]=useState()


  useEffect(()=>{
    fetchRecords();

  },[])

  const fetchRecords=()=>{
    axios.post(getGroceryURL)
    .then((res)=>{
      console.log(res,"api res")
      setRecords(res.data)
       setGroceryNoOfPages(Math.ceil(res.data.length / groceryItemsPerPage))


    })
    .catch((err)=>{
      console.log(err)
    })
  }



  const handleOnCellClick = (e, value) => {
    console.log(value)
     navigate("/groceryDetailPage", {state:{ record: {value} }})
  }
  const onHandleDelete = (e, value) => {
    console.log(value)
  }


  const handleAddRecord = () => {
    console.log('inside new record')
    navigate("/groceryDetailPage", {state:{ record: {} }})
  };

  const handleChangeBookPage=(e,value)=>{
    setGroceryPerPage(value);
  }


  
  const handleBookCardEdit = (row) => {
    console.log('selected record', row);
    const item = row;
    navigate("/bookdetailpage", { state: { record: { item } } })
  };

  const handleBookCardDelete = (e,row) => {
console.log(row)
    axios.post(DeletegetGroceryURL+row._id)
    .then((res)=>{
      console.log(res)
      fetchRecords()

    })
    .catch((err)=>{
      console.log(err)
    })
   
  }

  const handleOnRowClick =(item)=>{
    console.log(item,"handleOnRowClick")

    navigate("/groceryDetailPage", { state: { record: { item } } })
  }



  return (
<>

      <div className='btn_end_position'>
        <Button
          sx={{ color: 'white', m: 2 }}
          variant="contained"
          onClick={handleAddRecord}
        >
          New
        </Button>
      </div>

      <div style={{ width: '100%' }}>
      <Box
        sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}
      >
       <Grid container>
          <Grid item xs={12} md={12} >
            <Item >
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sr.No</TableCell>
            <TableCell align="left">Product</TableCell>
            <TableCell align="left">Catagory</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="center">Stock Quantity</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((row,index) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={()=>handleOnRowClick(row)}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="left">{row.productName}</TableCell>
              <TableCell align="left">{row.category}</TableCell>
              <TableCell align="left">{row.price}</TableCell>
              <TableCell align="center">{row.quantity}</TableCell>
              <TableCell align="center"> <button>Add to Cart</button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

            </Item>
          </Grid>

        </Grid>
      </Box>
    </div>
   
    </>
  )
}

export default Grocery