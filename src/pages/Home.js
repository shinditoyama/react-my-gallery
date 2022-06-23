import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import Gallery from "../components/PhotoGallery";
import Navbar from "../components/Navbar";

const Home = () => {
    const photos = useSelector((state) => state.file.list);
    const loading = useSelector((state) => state.file.status);

    return (
        <Box>
            <Navbar />
            <Box>
                {loading === "loading" && photos.length === 0 && <p>Loading...</p>}
                {loading === "success" && photos.length === 0 && <p>Nenhuma foto cadastrado.</p>}
                <Gallery />
            </Box>
        </Box>
    );
}

export default Home;