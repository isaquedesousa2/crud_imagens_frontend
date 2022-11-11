import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import AppBarDashboard from "/components/AppBarDashboard";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function ContainerDashboard({
    children,
    head,
    reaload,
    setControl,
}) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const { user } = useContext(AuthContext);

    const handleModal = () => setOpen((open) => !open);

    const handleAddImage = async () => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", name);
        formData.append("user", user["user"]["id"]);

        const options = {
            method: "POST",
            url: "https://faculdade.herokuapp.com/api/v1/imagens/",
            headers: {
                "Content-Type": "multipart/form-data;",
            },
            data: formData,
        };

        const res = await axios(options);

        if (res.status == 201) {
            handleModal();
            setControl((control) => !control);
        }
    };

    const openModal = () => {
        return (
            <Modal
                open={open}
                onClose={handleModal}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        background: "#fff",
                        width: "400px",
                        p: "20px",
                        borderRadius: "4px",
                    }}
                >
                    <Stack gap="10px">
                        <TextField
                            fullWidth
                            placeholder="Nome da foto"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </Stack>
                    <Stack flexDirection="row" gap="10px" sx={{ mt: "20px" }}>
                        <Button
                            color="error"
                            variant="contained"
                            onClick={handleModal}
                            sx={{ flex: 1 }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            color="success"
                            variant="contained"
                            onClick={handleAddImage}
                            sx={{ flex: 1 }}
                        >
                            Salvar
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        );
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBarDashboard />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    background: "#F7F5F9",
                    minHeight: "100vh",
                }}
            >
                <Toolbar variant="dense" />
                <Box
                    sx={{
                        margin: "0 auto",
                        maxWidth: "1350px",
                    }}
                >
                    <Stack
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            marginX: "35px",
                        }}
                    >
                        <Typography
                            color="#373946"
                            fontWeight={600}
                            fontSize={"18px"}
                        >
                            {head}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => setOpen((open) => !open)}
                        >
                            Adicionar foto
                        </Button>
                    </Stack>

                    <Box sx={{ marginX: "10px" }}>{children}</Box>
                </Box>
            </Box>
            {open && openModal()}
        </Box>
    );
}
