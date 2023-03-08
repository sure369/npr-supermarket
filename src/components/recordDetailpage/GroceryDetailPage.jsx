import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid, Button, DialogActions, Box, TextField, Autocomplete, Select, FormLabel } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'

const upsertURL = `${process.env.REACT_APP_API_KEY}/upsertProductData`;

const GroceryDetailPage = ({ item }) => {

  const [passedRecord, setPassedRecord] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNew, setshowNew] = useState(true)


  // notification
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

  useEffect(() => {

    if(location.state.record.item){
      console.log('passed record', location.state.record.item);
      setPassedRecord(location.state.record.item);
      setshowNew(!location.state.record.item)
    }
  }, [])

  console.log(location.state.record.item,"item")

  const initialValues = {
    productId: '',
    productName: '',
    category: '',
    quantity: '',
    price:''
  }

  const savedValues = {
    productId: passedRecord?.productId ?? "",
    productName: passedRecord?.productName ?? "",
    quantity: passedRecord?.quantity ?? "",
    category: passedRecord?.category ?? "",
    price:passedRecord?.price??"",
    _id: passedRecord?._id ?? "",
  }


  const validationSchema = Yup.object({
    productName: Yup
      .string()
      .required('Required')
      .max(30, 'productId must be less than 30 characters'),
  
  })

  const formSubmission = (values) => {

    console.log('form submission value', values);

    axios.post(upsertURL, values)
      .then((res) => {
        console.log('upsert record  response', res);
        setTimeout(() => {
          navigate(-1);
        }, 2000)
      })
      .catch((error) => {
        console.log('upsert record  error', error);
      })
  }
  const handleFormClose = () => {
    navigate(-1)
  }
  return (

    <Grid item xs={12} style={{ margin: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        {
          showNew ? <h3>New Grocery</h3> : <h3>Grocery Detail Page </h3>
        }
      </div>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={showNew ? initialValues : savedValues}
          validationSchema={validationSchema}
          onSubmit={(values) => { formSubmission(values) }}
        >
          {(props) => {
            const {
              values,
              isSubmitting,
            } = props;

            return (
              <>
                <div className='form_center_box'>

                  <Box m="auto">
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="productName">Product Name  <span className="text-danger">*</span></FormLabel>
                          <Field name="productName" type="text" class="form-input" />
                          <div style={{ color: 'red' }}>
                            <ErrorMessage name="productName" />
                          </div>
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="quantity">Quantity </FormLabel>
                          <Field name="quantity" type="number" class="form-input" />
                        </Grid>                        
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="price">Price</FormLabel>
                          <Field name="price" type="number" class="form-input" />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="category">Category</FormLabel>
                          <Field name="category" as="select" class="form-input"  >
                            <option value=""><em>None</em></option>
                            <option value="Fruits">Fruits</option>
                            <option value="Vegetables ">Vegetables </option>
                            <option value="Snacks">Snacks</option>
                            <option value="Bread ">Bread </option>
                            <option value="Beverages">Beverages</option>
                            <option value="Cereal ">Cereal </option>
                            <option value="PersonalCare ">Personal Care </option>
                          </Field>
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <FormLabel htmlFor="productId">Product Id </FormLabel>
                          <Field name="productId" type="text" class="form-input" />
                        </Grid>
                        {
                          !showNew &&
                          <Grid item xs={6} md={6}>
                            <FormLabel htmlFor="RemaingProductQuantity">Remaing Product Quantity  </FormLabel>
                            <Field name="RemaingProductQuantity" type="number" readOnly value={values.quantity } class="form-input" />
                          </Grid>
                        }
                      </Grid>
                      <div className='action-buttons'>
                        <DialogActions sx={{ justifyContent: "space-between" }}>
                          {
                            showNew ?
                              <Button type='success' variant="contained" color="secondary" disabled={isSubmitting}>Save</Button>
                              :
                              <Button type='success' variant="contained" color="secondary" disabled={isSubmitting}>Update</Button>
                          }
                          <Button type="reset" variant="contained" onClick={handleFormClose}  >Cancel</Button>
                        </DialogActions>
                      </div>
                    </Form>
                  </Box>
                </div>
              </>
            )
          }}
        </Formik>
      </div>
    </Grid>
  )
}
export default GroceryDetailPage;

