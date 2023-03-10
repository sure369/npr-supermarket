import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper,Typography } from '@mui/material';
import { Box } from '@mui/system';

function BillPreview() {
  
  const getBillsUrl = `${process.env.REACT_APP_API_KEY}/getBillData`;


  const[billRecords,setBillRecords]=useState()

  useEffect(()=>{
fetchRecords()
  },[])

  const fetchRecords=()=>{
    axios.post(getBillsUrl)
    .then(res=>{
      console.log(res,"api res")
      setBillRecords(res.data)
    })
    .catch(err=>{
      console.log(err,"api error")
    })
  }



  return (
    <>
    {
      billRecords &&
   <>

<Typography variant='h5'> Bill Preview </Typography>

<Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 300,
          height: 200,
        },
      }}
    >
      {billRecords.map((item,index)=>(
<Paper sx={{textAlign: 'left', alignItems: 'flex-start', justifyContent: 'flex-start',p:2 ,bgcolor:'#B2BEB5' ,color:'#FFFFFF'}}>
  <Typography variant='h6'>Product : {item.productName}</Typography>
  <Typography>ProductPrice : {item.productPrice}</Typography>
  <Typography>Quantity: {item.buyQuantity}</Typography>
  <Typography>Toatal: {item.billAmount}</Typography>
  <Typography>Bill Id: {item._id}</Typography>
  <Typography>Bill Date: {  (item.billDate)}</Typography>
</Paper>
      ))}
    </Box>
</>
    }
  </>
  );
}

export default BillPreview;