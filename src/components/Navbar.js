import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Avatar, Box, Toolbar, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import FormDialog from "./FormDialog";
import FormUpload from "./FormUpload";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { googleSignOut } from "../utils/functions";
import { login, logout } from "../store/slices/userSlice";

export default function Navbar() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dialogHandler = () => {
        setOpenDialog(!openDialog);
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(login({
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }));
            } else {
                dispatch(logout());
            }
        });
    }, [dispatch]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <FormDialog open={openDialog} dialogHandler={dialogHandler} />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
                        React Gallery
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    {isAuthenticated && <FormUpload />}

                    <Box sx={{ flexGrow: 1 }} />
                    {user?.name}
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        {!isAuthenticated ? (
                            <Avatar sx={{ width: 36, height: 36 }} />
                        ) : (
                            <Avatar src={user.photo} alt={user.name} sx={{ width: 36, height: 36 }} />
                        )}
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {!isAuthenticated ? (
                            <MenuItem onClick={() => {
                                setOpenDialog(true);
                                handleClose();
                            }}>Login</MenuItem>
                        ) : (
                            <MenuItem onClick={() => {
                                googleSignOut();
                                handleClose();
                            }}>Logout</MenuItem>
                        )}
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    );
}