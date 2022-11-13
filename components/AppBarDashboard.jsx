// APPBAR

import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useCookies } from "react-cookie";

import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { Router, useRouter } from "next/router";

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

export default function AppBarDashboard() {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(["auth-token"]);
    return (
        <AppBar
            position="fixed"
            size="dense"
            color="default"
            sx={{
                boxShadow: "rgba(100, 100, 111, 0.4) 0 0 4px 0px",
                background: "#F7F5F9",
            }}
        >
            <Toolbar
                variant="dense"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Stack flexDirection="row" alignItems="center">
                    <Typography
                        variant="h1"
                        fontSize="18px"
                        fontWeight={600}
                        color="#373946"
                    >
                        Repositório de fotos
                    </Typography>
                </Stack>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                        removeCookie("auth-token", { path: "/" });
                        router.reload();
                    }}
                    sx={{
                        p: "3px",
                    }}
                >
                    Sair
                </Button>
            </Toolbar>
        </AppBar>
    );
}
