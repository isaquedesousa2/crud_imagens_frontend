// PAGINA PARA REALIZAR O LOGIN

import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AuthContext } from "../../context/AuthContext";
import Link from "next/link";

export default function Entrar() {
    // CONTROLE DE ESTADOS DA APLICACAO
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { Login } = useContext(AuthContext);
    const [error, setError] = useState("");

    const handlePassword = () => setShowPassword(!showPassword);

    // FUNCAO QUE CHAMA O LOGIN DO AUTH CONTEXT E VERIFICA SE E VALIDO
    const handleSubmitLogin = async (e) => {
        setError("");

        e.preventDefault();
        const res = await Login({ email, password });
        if (res == 401) {
            setError("Email ou senha inválidos");
        }
    };

    // RENDERIZACAO DA PAGINA
    return (
        <Box
            sx={{
                background: "#F8F9FE",
                width: "100%",
                minHeight: "100vh",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    position: "absolute",
                    top: "50%",
                    right: "50%",
                    transform: "translate(50%,-50%)",
                    width: "100%",
                    maxWidth: "400px",
                    textAlign: "center",
                    p: 2,
                }}
            >
                <Box
                    component="form"
                    onSubmit={(e) => handleSubmitLogin(e)}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight={500}
                        sx={{ marginBottom: 5 }}
                    >
                        Entrar
                    </Typography>
                    <FormControl variant="outlined" sx={{ marginBottom: 2 }}>
                        <OutlinedInput
                            fullWidth
                            required
                            sx={{
                                height: "45px",
                                fontSize: "13px",
                            }}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl variant="outlined" sx={{ marginBottom: 2 }}>
                        <OutlinedInput
                            fullWidth
                            required
                            sx={{
                                height: "45px",
                                fontSize: "13px",
                            }}
                            type={showPassword ? "text" : "password"}
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handlePassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <Visibility
                                                sx={{ fontSize: "20px" }}
                                            />
                                        ) : (
                                            <VisibilityOff
                                                sx={{ fontSize: "20px" }}
                                            />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Typography color="red" fontSize={12}>
                        {error}
                    </Typography>

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 2,
                            mb: 2,
                        }}
                    >
                        Entrar
                    </Button>
                </Box>
                <Link href="/auth/register">
                    <Typography
                        variant="span"
                        sx={{ fontSize: "14px" }}
                        // sx={{ color: "#F5F6F9" }}
                    >
                        Criar conta
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
}
