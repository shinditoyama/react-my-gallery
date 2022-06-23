import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageList, ImageListItem, ImageListItemBar, IconButton, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete"
import { deleteFile } from "../utils/functions";
import { getFiles } from "../store/slices/fileSlice";

import "photoswipe/dist/photoswipe.css"
import { Gallery, Item } from "react-photoswipe-gallery";

const PhotoGallery = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const photos = useSelector((state) => state.file.list);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.up("md"));

    useEffect(() => {
        dispatch(getFiles());
    }, [dispatch]);

    const onDelete = async (name) => {
        await deleteFile(name);
        dispatch(getFiles());
    }

    return (
        <Gallery withDownloadButton>
            <ImageList cols={isMobile ? 5 : 2} >
                {photos.map((item, index) => (
                    <ImageListItem key={index}>
                        <Item
                            original={item.url}
                            thumbnail={item.url}
                            width="1600"
                            height="1200"
                            alt={item.name}
                        >
                            {({ ref, open }) => (
                                <img
                                    style={{ width: "100%", height: 200, cursor: "pointer" }}
                                    src={item.url}
                                    alt={item.name}
                                    ref={ref}
                                    onClick={open}
                                />
                            )}
                        </Item>
                        {isAuthenticated &&
                            <ImageListItemBar
                                sx={{
                                    background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                                }}
                                title={item.name}
                                position="top"
                                actionPosition="left"
                                actionIcon={
                                    <IconButton sx={{ color: "red" }} onClick={() => onDelete(item.name)}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            />
                        }
                    </ImageListItem>
                ))}
            </ImageList>
        </Gallery>
    );
}

export default PhotoGallery;