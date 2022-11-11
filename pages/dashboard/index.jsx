import { useState, useEffect, useContext } from "react";
import ContainerDashboard from "../../components/ContainerDashboard";
import CardAction from "../../components/CardAction";
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
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Dashboard() {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState();
    const [images, setImages] = useState();
    const [control, setControl] = useState(false);
    const [id, setId] = useState();
    const { user } = useContext(AuthContext);

    const handleModal = () => setOpen((open) => !open);

    useEffect(() => {
        if (user) {
            const options = {
                method: "POST",
                url: "/api/images/search",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                data: {
                    user: user["user"]["id"],
                },
            };
            async function get() {
                const res = await axios(options);
                setImages(res.data["data"]);
            }
            get();
        }
    }, [control, user]);

    const handleDeleteImage = async () => {
        const formData = new FormData();
        formData.append("id", id);
        const options = {
            method: "DELETE",
            url: "https://faculdade.herokuapp.com/api/v1/imagens/",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            data: formData,
        };

        const res = await axios(options);

        if (res.status == 200) {
            handleModal();
            setControl(!control);
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

    const filter = search.length
        ? images.filter((data) => data.name.includes(search))
        : images;

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

export const getServerSideProps = async (context) => checkToken(context);
