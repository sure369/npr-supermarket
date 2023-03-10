import React,{useEffect, useState} from 'react'
import '../styles/newForm.css'
import { useNavigate } from 'react-router-dom';
import {Box, Button, Grid,Table,
        TableBody,TableCell,TableContainer,
        TableHead,TableRow,Paper,
        Modal,
      }
        from "@mui/material";
import axios from 'axios'
import PropTypes from 'prop-types';
import ModalAddtoCart from '../recordDetailpage/ModalAddToCart';

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



  const[records,setRecords]=useState([])
const[modalShowBill,setModalmodalShowBill]=useState(false)
const[addCartRecord,setAddCartRecord]=useState()

  useEffect(()=>{
    fetchRecords();

  },[])

  const fetchRecords=()=>{
    axios.post(getGroceryURL)
    .then((res)=>{
      console.log(res,"api res")
      setRecords(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  const handleAddRecord = () => {
    console.log('inside new record')
    navigate("/groceryDetailPage", {state:{ record: {} }})
  };


  const handleOnRowClick =(item)=>{
    console.log(item,"handleOnRowClick")
    navigate("/groceryDetailPage", { state: { record: { item } } })
  }

  const handleAddCart=(item)=>{
    console.log(item,"handleAddCart")
    setAddCartRecord(item)
    setModalmodalShowBill(true)
  }

  const handleModalShowBillModalClose=()=>{
    setModalmodalShowBill(false)
    fetchRecords()
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
           
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="left">{row.productName}</TableCell>
              <TableCell align="left">{row.category}</TableCell>
              <TableCell align="left">{row.price}</TableCell>
              <TableCell align="center">{row.quantity}</TableCell>
              <TableCell align="right"> <button  className="edit__button"  onClick={()=>handleOnRowClick(row)} >Edit</button> </TableCell>
              <TableCell align="right"> <button  className="add-to-cart__button" onClick={()=>handleAddCart(row)} >Add to Cart</button> </TableCell>
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
   
    <Modal
        open={modalShowBill}
        onClose={handleModalShowBillModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ backdropFilter: "blur(2px)" }}
      >
        <Box sx={ModalStyle}>
          <ModalAddtoCart data={addCartRecord}  handleModal={handleModalShowBillModalClose} />
        </Box>
      </Modal>

    </>
  )
}

export default Grocery