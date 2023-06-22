import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

type deleteDialogProp = {
    handleClose : ()=>void,
    handleCancel ? : ()=>void,
    title: string,
    message : string,
    type : 'Delete' | 'Add' | 'Info'
}

const DeleteDialog = ({handleClose,title,message,type,handleCancel}:deleteDialogProp) =>{
    return <Dialog
    open={true}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        {message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      {type==='Delete' && <Button onClick={handleCancel}>No</Button>}
      <Button onClick={handleClose}>{type==='Delete'?'Yes':'Ok'}</Button>
    </DialogActions>
  </Dialog>
}
export default DeleteDialog

  