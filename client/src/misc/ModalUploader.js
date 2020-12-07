import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { Dialog, DialogActions, DialogTitle, Button } from "@material-ui/core";

const ModalUploader = ({ open, closeModal }) => {
    
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => { return { url: 'http://localhost:5000/map_upload' } }
  
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => { console.log(meta) };
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files) => { console.log(files.map(f => f.meta)) };

  const handleClose = () => {
    closeModal()
  }
 
  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Upload your map to edit
      </DialogTitle>
      <DialogActions>
        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          accept="image/png"
        />
        <Button autoFocus onClick={handleClose} color="primary">
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalUploader;