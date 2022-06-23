import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { uploadFile } from "../utils/functions";
import { getFiles } from "../store/slices/fileSlice";

const FormUpload = () => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        const fileObj = event.target.files[0];
        if (!fileObj) {
            return;
        }

        setFile(fileObj);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        await uploadFile(file);
        dispatch(getFiles());
        setFile(null);
        inputRef.current.value = null;

        setLoading(false);
    };

    return (
        <Box sx={{
            border: 1,
            borderRadius: 1,
            borderColor: 'grey.500',
            backgroundColor: 'background.paper',
            padding: 1,
            marginY: 1,
        }}>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input type="file" ref={inputRef} className="form-control" onChange={handleFileChange} />
                    {loading ? (
                        <button type="button" className="btn btn-primary" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span className="visually-hidden">Loading...</span>
                        </button>
                    ) : (
                        <button type="submit" className="btn btn-primary" disabled={file ? "" : file === null}>Upload</button>
                    )}
                </div>
            </form>
        </Box>
    )
}

export default FormUpload;