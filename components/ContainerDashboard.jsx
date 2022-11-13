// COMPONENTE QUE ENVOLVE A GRID DAS IMAGENS

import { useState,  useContext } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import { Button, Stack, Typography } from "@mui/material";
import AppBarDashboard from "/components/AppBarDashboard";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import ModalCustom from "./ModalCustom";

export default function ContainerDashboard({
    children,
    head,
    setControl,
}) {
    // CONTROLE DE ESTADOS DA APLICACAO
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const { user } = useContext(AuthContext);

    const handleModal = () => setOpen((open) => !open);


    // FUNCAO PARA ADICIONAR UMA NOVA IMAGEM
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


    // MODAL QUE ABRE AO CLICAR PARA ADICIONAR UMA IMAGEM
    const openModal = () => {
        return (
            <ModalCustom
                open={open}
                handleModal={handleModal}
                handleAddImage={handleAddImage}
                setName={setName}
                setImage={setImage}
            />
        );
    };


    // RENDERIZACAO DA PAGINA
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
