import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, FormGroup, InputLabel, TextField, MenuItem, Select,Toolbar } from '@mui/material'
import styled from '@mui/styled-engine-sc'
import { useLocation, useHistory, Link, useParams } from 'react-router-dom';
import { ChangeEvent, useState, FormEvent ,useEffect} from 'react';
import { addCountry, editCountry, getCountry } from '../services/countryService';
import DeleteDialog from './DeleteDialog';

export interface FormValues {
  id?: number
  name?: string;
  status?: string;
}
const drawerWidth = 240
const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  text-align:left;

`;

const StyledField = styled(Field)`
  width: 100%;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
`;



const CountryForm = () => {
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false)
  const [message, setMessage] = useState<any>('')
  const location = useLocation()
  const history = useHistory()
  const params = useParams<{id:string}>()
  let name:string =''
  let status:string = 'Active'
  const fetchData = async() => {
    const result:any = await getCountry('admin/country/'+params.id)
    console.log(result)
    formik.setValues({
      name: result.name,
      status: result.status == 2 ?'Active':'InActive'
    })
  }

  useEffect(()=>{
    if(params.id){
      fetchData()
    }
  },[])



const formik = useFormik({
  initialValues: {
    name: name,
    status: status 
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Name is required'),
    status: Yup.string().required('Status is required')
  }),
  onSubmit: async (values) => {
    const path = location.pathname.toLowerCase() === '/admin/country/add' ? 'admin/country' : `admin/country/${params.id}`
    const msg = path === 'admin/country' ? await addCountry(path, values) : await editCountry(path, values)
    setMessage(msg)
    setOpenAddDialog(true)
  },
})
  
  const handleClose = () => {
    history.replace('/admin/country')
  }


  return (
    <StyledBox component='main' sx={{flexGrow: 1, p: 3, marginLeft:{lg:`${drawerWidth}px`,sm:`${drawerWidth}px`,md:`${drawerWidth}px`}}}>
      <Toolbar />
      {openAddDialog && <DeleteDialog handleClose={handleClose} title='Success' message={message} type='Add' />}
      <form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <InputLabel htmlFor="name">Name:</InputLabel>
          <StyledField
            as={TextField}
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.name && formik.errors.name ? true : false}
            helperText={formik.touched.name && formik.errors.name}
            disabled={location.pathname.toLowerCase() === '/admin/country/view/'+params.id}
          />
        </FormGroup>

        <FormGroup>
          <InputLabel htmlFor="status">Status:</InputLabel>
          <StyledField
            as={Select}
            id="status"
            name="status"
            value={formik.values.status}
            onBlur={formik.handleBlur}
            error={formik.touched.status && formik.errors.status ? true : false}
            helperText={formik.touched.status && formik.errors.status}
            disabled={location.pathname.toLowerCase() === '/admin/country/view/'+params.id}
            onChange={formik.handleChange}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="InActive">InActive</MenuItem>
          </StyledField>
        </FormGroup>
        <FormGroup sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 1 }}>
          {<Button onClick={() => history.goBack()} variant='contained' sx={{
            backgroundColor: 'red', '&:hover': {
              backgroundColor
                : 'darkred'
            }
          }}>Cancel</Button>}
          {location.pathname.toLowerCase() !== '/admin/country/view/'+params.id ?
            <Button variant='contained' type="submit">Submit</Button> :
            <Button component={Link} to={`/admin/country/edit/${params.id}`} variant='contained'>Edit</Button>}
        </FormGroup>
      </form>
    </StyledBox>
  )
}
export default CountryForm