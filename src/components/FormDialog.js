import { Button, Stack, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { orange } from "@mui/material/colors";
import GoogleIcon from "@mui/icons-material/Google";
// import FacebookIcon from "@mui/icons-material/Facebook";
import { googleSignIn } from "../utils/functions";

export default function FormDialog({ open, dialogHandler }) {
    const signInGoogle = () => {
        googleSignIn();
        dialogHandler();
    }

    return (
        <Dialog
            open={open}
            onClose={dialogHandler}
            keepMounted
            fullWidth
            maxWidth="xs"
        >
            <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>SIGN IN</DialogTitle>
            <DialogContent>
                <Stack spacing={3}>
                    <Button
                        size="large"
                        variant="contained"
                        color="warning"
                        sx={{ bgcolor: orange[700] }}
                        fullWidth
                        disableElevation
                        onClick={signInGoogle}
                    >
                        <GoogleIcon sx={{ mr: 1 }} />Login with Google
                    </Button>
                    {/*<Button
                        size="large"
                        variant="contained"
                        color="primary"
                        sx={{ bgcolor: blue[700] }}
                        disableElevation
                        fullWidth
                        onClick={() => alert("Login Facebook")}
                    >
                        <FacebookIcon sx={{ mr: 1 }} />Login with Facebook
                    </Button>*/}
                </Stack>
            </DialogContent>
        </Dialog>
    );
}