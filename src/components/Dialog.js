/*
  DESARROLLO Y PROGRAMACIÓN PROGRAMANDOWEB
  lic.jorgemendez@gmail.com
  +573115000926
*/

import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import Link from '@material-ui/core/Link';

/*
    ESTE COMPONENTE ES UNA PEQUEÑA VENTANA MODAL PARA COMUNICAR ERRORES
    O MENSAJES DEL SISTEMA
*/

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AlertDialogSlide(props) {

  const handleClose = () => {
    let change  = props.methods.state.dialog;
        change["status"]=false;
    props.methods.setState({dialog:change})
  };

  /*
    Esta modal tiene como parámetros
    1: message
    2: ícono
    3: clase del color del ícono
  */

  function buttonDiv(){
    return <div className="text-center mt-3"><div className="btn btn-primary btn-lg " onClick={handleClose}> Continuar </div></div>
  }

  function buttonLink(){
    return <div className="text-center mt-3"><Link className="btn btn-primary btn-lg" href={props.methods.state.dialog.customButtom.link} ><span className="text-white">Continuar</span></Link></div>
  }

  return (
    <div className="App-modal-content text-center">
      <Dialog
        open={props.methods.state.dialog.status}
        fullWidth={true}
        maxWidth={'sm'}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          {(props.methods.state.dialog.ico!==undefined)?<div className={(props.methods.state.dialog.ico.contentColor!==undefined)?' rounded-circle '+props.methods.state.dialog.ico.contentColor:'rounded-circle'}>
            <i className={(props.methods.state.dialog.ico.ico!==undefined)?props.methods.state.dialog.ico.ico+' fa-3x':'fas fa-check fa-3x'}></i>
          </div>:"<div/>"}
          <h3 className="text-center">{props.methods.state.dialog.title}</h3>
          <DialogContentText id="alert-dialog-slide-description" className="text-center">
            {props.methods.state.dialog.message}
          </DialogContentText>
          {
            ( props.methods.state.dialog.customButtom===undefined )? buttonDiv() :  buttonLink()
          }
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AlertDialogSlide
