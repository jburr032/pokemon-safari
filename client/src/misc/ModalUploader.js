import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { Dialog, DialogActions, DialogTitle, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  dialogTitle: { 
    marginLeft: "170px", 
    fontWeight: "500" 
  }
})

const ModalUploader = ({ open, closeModal }) => {   
  const classes = useStyles(); 
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => { return { url: 'http://localhost:5000/v1/map_upload' } }
  
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {};
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files) => { console.log(files.map(f => f.meta)) };

  const handleClose = () => {
    closeModal()
  }
 
  return (
    <Dialog fullWidth={true} onClose={handleClose} open={open}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{    marginLeft: "170px", 
    fontWeight: "500" }}>
        Upload your map to edit
      </DialogTitle>
      <DialogActions style={{ paddingBottom: "43px" }}>
        <Dropzone
            style={{ height: "300px" }}            
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            inputContent={(files, extra) => (extra.reject ? "PNG files only" : "Drag Files")}
            handleSubmit={handleSubmit}
            accept="image/png"
            styles={{
              dropzone: {  height: "300px", width: "95%" },
              dropzoneReject: { borderColor: "red", backgroundColor: "#DAA", height: "300px", width: "95%" },
              inputLabel: (files, extra) => (extra.reject ? { color: "red" } : {}),
            }}
        />

      </DialogActions>
    </Dialog>
  )
}

export default ModalUploader;