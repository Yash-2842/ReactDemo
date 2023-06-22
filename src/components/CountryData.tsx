import { Box, Button, Typography } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchBar from './UI/SearchBar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid, GridColDef, GridValueGetterParams, GridCellParams, GridPaginationModel } from '@mui/x-data-grid';

import { Route, Link, useLocation, useHistory } from 'react-router-dom'
import CountryForm, { FormValues } from './CountryForm';
import { useEffect, useRef, useState } from 'react';
import DeleteDialog from './DeleteDialog';
import { deleteCountry, getAllCountries } from '../services/countryService';
import Toolbar from '@mui/material/Toolbar';

const drawerWidth = 240;
export type countryDataType = {
  id: number,
  name: string,
  status: string
}

const CountryData = () => {
  const deleteId = useRef<number | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting,setIsDeleting] =  useState(false)
  const [message,setMessage] = useState('')
  const [paginationModel,setPaginationModel] = useState({
    page: 0,
    pageSize : 5
  })
  const [data, setData] = useState<readonly any[]>([] as readonly any[])
  const history = useHistory()
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string | undefined>()
  const totalRecord = useRef(0)
  const fetchData = async () => {
    const rows: any = await getAllCountries('admin/country/search', paginationModel.page+1, paginationModel.pageSize, '', '', keyword)
    const formattedData = rows.data.result.map((record: any) => { return { ...record, status:record.status === 0 ? 'Deleted' : record.status === 1 ? 'Inactive' : 'Active', } })
    totalRecord.current = rows.data.totalRecords
    setData(formattedData)
    setIsLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [keyword,paginationModel])
  const handleEditView = (id: number, path: string) => {
    history.push(`/admin/Country/${path}/${id}`)
  }


  const handleDelete = (id: number) => {
    deleteId.current = id
    setIsDeleting(true)
    setMessage('Are you sure you want to delete this country?')
    setOpenDeleteDialog(true)
  }

  const deleteConfirm = async()=> {
    setIsDeleting(false)
    const res:any =await deleteCountry('admin/country/' + deleteId.current)
    setMessage(res)
  }

  const handleClose = () => {
    fetchData()
    setOpenDeleteDialog(false)
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
  
const handlePagination = (params:GridPaginationModel)=> {
  console.log(params)
  setPaginationModel(params)
}

  return (
    <Box  component="main"
      sx={{ flexGrow: 1, p: 3, marginLeft:{lg:`${drawerWidth}px`,sm:`${drawerWidth}px`,md:`${drawerWidth}px`} }}>
      <Toolbar />

      {openDeleteDialog && <DeleteDialog handleClose={isDeleting?deleteConfirm:handleClose} handleCancel={() => setOpenDeleteDialog(false)} title='Delete Confirmation' message={message} type={isDeleting ?'Delete':'Info'} />}
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h5'>Countries</Typography>
        <Button component={Link} to='/admin/country/add' variant='contained' sx={{ backgroundColor: '#21479e', color: 'white' }} ><span><AddOutlinedIcon sx={{ color: 'white' }} /></span>Add New Country</Button>
      </Box>
        <Box>
          <SearchBar searchKeyword={(key) => setKeyword(key)} />
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
            rowCount = {totalRecord.current}
            pageSizeOptions={[5, 10]}
          // checkboxSelection
          />}
    </Box>
  )
}
export default CountryData