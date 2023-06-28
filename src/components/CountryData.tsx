import { Box, Button, Typography } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchBar from './UI/SearchBar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid, GridColDef, GridValueGetterParams, GridCellParams, GridPaginationModel } from '@mui/x-data-grid';

import { Route, Link, useLocation, useHistory } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react';
import DeleteDialog from './Dialog';
import { deleteCountry, getAllCountries } from '../services/countryService';
import Toolbar from '@mui/material/Toolbar';
import { useDebounce } from '../helper/index';
import { countryDataType } from '../interface/countryInterface';
import {toast} from 'react-toastify'
const drawerWidth = 240;


const CountryData = () => {
  const deleteId = useRef<number | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  // const [isDeleting, setIsDeleting] = useState(false)
  // const [message, setMessage] = useState('')
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5
  })
  const [data, setData] = useState<readonly any[]>([] as readonly any[])
  const history = useHistory()
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string | undefined>()
  const totalRecord = useRef(0)

  const fetchData = async () => {
    setIsLoading(true)
    const rows: any = await getAllCountries('admin/country/search', paginationModel.page + 1, paginationModel.pageSize, '', '', keyword)
    const formattedData = rows.data.result.map((record: any) => { return { ...record, status: record.status === 0 ? 'Deleted' : record.status === 1 ? 'Inactive' : 'Active', } })
    totalRecord.current = rows.data.totalRecords
    setData(formattedData)
    setIsLoading(false)
  }

  useDebounce(fetchData,[keyword,paginationModel])
 
  const handleEditView = (id: number, path: string) => {
    history.push(`/admin/Country/${path}/${id}`)
  }


  const handleDelete = (id: number) => {
    deleteId.current = id
    // setIsDeleting(true)
    // setMessage('Are you sure you want to delete this country?')
    setOpenDialog(true)
  }

  const deleteConfirm = async () => {
    // setIsDeleting(false)
    const response: any = await deleteCountry('admin/country/' + deleteId.current)
    if (response.status >= 200 && response.status < 300) {
      toast.success(response.message, {
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        fetchData()
    }else{
      toast.error(response.message, {
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }

    setOpenDialog(false)
    // setMessage(res)
  }

  const handleClose = () => {
    

  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 10 },
    { field: 'name', headerName: 'Name', width: 140 },
    { field: 'status', headerName: 'Status', width: 125 },
    {
      field: 'Actions',
      headerName: 'Actions',
      width: 500,
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <Box>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => handleEditView(params.row.id, 'edit')}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            startIcon={<VisibilityIcon />}
            onClick={() => handleEditView(params.row.id, 'view')}
          >
            View
          </Button>
        </Box>
      ),
    },
  ];

  const handlePagination = (params: GridPaginationModel) => {
    console.log(params)
    setPaginationModel(params)
  }

  return (
    <Box component="main"
      sx={{ flexGrow: 1, p: 3, marginLeft: { lg: `${drawerWidth}px`, sm: `${drawerWidth}px`, md: `${drawerWidth}px` } }}>
      <Toolbar />

      {openDialog && <DeleteDialog handleClose={deleteConfirm} handleCancel={() => setOpenDialog(false)} title='Delete Confirmation' message='Are you sure you want to delete this country?' type='Delete' />}
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h5'>Countries</Typography>
        <Button component={Link} to='/admin/country/add' variant='contained' sx={{ backgroundColor: '#21479e', color: 'white' }} ><span><AddOutlinedIcon sx={{ color: 'white' }} /></span>Add New Country</Button>
      </Box>
      <Box>
        <SearchBar searchHandler={(key) => setKeyword(key)} />
      </Box>
      {isLoading ? <p>Loading...</p> :
        <DataGrid
          sx={{ width: '100%', marginTop: '1rem', height: 400 }}
          rows={data}
          columns={columns}
          pagination
          paginationMode='server'
          paginationModel={paginationModel}
          onPaginationModelChange={handlePagination}
          rowCount={totalRecord.current}
          pageSizeOptions={[5, 10]}
        // checkboxSelection
        />}
    </Box>
  )
}
export default CountryData