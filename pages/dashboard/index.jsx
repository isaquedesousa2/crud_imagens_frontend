// PAGINA DA DASHBOARD

import { useState, useEffect, useContext } from "react";
import ContainerDashboard from "../../components/ContainerDashboard";
import CardAction from "../../components/ImageContainer";
import { checkToken } from "../../helpers/checkToken";
import { Box, Stack } from "@mui/system";
import {
    Button,
    Grid,
    IconButton,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../../context/AuthContext";
import axiosResquests from "../../helpers/axiosRequests";

export default function Dashboard() {
    // CONTROLE DE ESTADOS DA APLICACAO
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState();
    const [images, setImages] = useState();
    const [control, setControl] = useState(false);
    const [id, setId] = useState();
    const { user } = useContext(AuthContext);
    const { get, _delete } = axiosResquests;

    const handleModal = () => setOpen((open) => !open);

    // FUNCAO PARA BUSCAR IMAGENS DO USUARIO
    useEffect(() => {
        if (user) {
            const searchImage = async () => {
                const res = await get({
                    url: `https://faculdade.herokuapp.com/api/v1/imagens/${user["user"]["id"]}`,
                });
                console.log(res);

                setImages(res.data);
            };

            searchImage();
        }
    }, [control, user]);

    // FUNCAO PARA DELETAR IMAGEM SELECIONADA
    const handleDeleteImage = async () => {
        const formData = new FormData();
        formData.append("id", id);

        const res = await _delete({
            url: "https://faculdade.herokuapp.com/api/v1/imagens/",
            data: formData,
        });

        if (res.status == 200) {
            handleModal();
            setControl(!control);
        }
    };

    // MODAL QUE ABRE QUANDO APERTA PARA DELETAR A IMAGEM
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
                    <Typography>Deseja realmente excluir essa foto?</Typography>
                    <Stack flexDirection="row" gap="10px" sx={{ mt: "20px" }}>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleModal}
                            sx={{ flex: 1 }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            color="error"
                            variant="contained"
                            sx={{ flex: 1 }}
                            onClick={handleDeleteImage}
                        >
                            Excluir
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        );
    };

    // FUNCAO PARA FILTRAR AS IMAGENS AO DIGITAR NO CAMPO DE BUSCAR
    const filter = search.length
        ? images.filter((data) => data.name.includes(search))
        : images;

    // RENDERIZACAO DA PAGINA
    return (
        <ContainerDashboard
            head="Minhas fotos"
            reaload={handleModal}
            setControl={setControl}
        >
            <Box
                sx={{
                    display: "flex",
                    maxWidth: "300px",
                    gap: "20px",
                    margin: "10px",
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Buscar pelo nome"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    size="small"
                    sx={{
                        fontSize: "10px",
                        flex: 3,
                        marginLeft: "15px",
                    }}
                />
            </Box>
            <CardAction>
                {filter?.map((item) => (
                    <Grid item key={item.id}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "10px",
                            }}
                        >
                            <img
                                src={`https://faculdade.herokuapp.com${item.imagem}`}
                                alt={item.name}
                                width={200}
                                height={150}
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "100%",
                                }}
                            >
                                {item.name}
                                <IconButton
                                    onClick={() => {
                                        handleModal();
                                        setId(item.id);
                                    }}
                                >
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </CardAction>
            {open && openModal()}
        </ContainerDashboard>
    );
}

// FUNCAO QUE VERIFICAR SE EXISTE UM COOKIE E SE PODE ACESSAR A PAGINA
export const getServerSideProps = async (context) => checkToken(context);
