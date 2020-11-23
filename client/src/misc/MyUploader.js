import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
 
const MyUploader = () => {
    
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => { return { url: 'http://localhost:5000/map_upload' } }
  
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => { console.log(meta) }
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files) => { console.log(files.map(f => f.meta)) }
 
  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      accept="image/png"
    />
  )
}

export default MyUploader;