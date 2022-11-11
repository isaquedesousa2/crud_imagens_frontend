import styled from "@emotion/styled";
import {
    Box,
    Grid,
    ImageListItem,
    ImageListItemBar,
    Stack,
    Typography,
} from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";

const CardContainer = styled(Box)(() => ({
    boxShadow: "rgba(100, 100, 111, 0.2) 0 0px 20px 0px",
    display: "inline-block",
    borderRadius: "10px",
    padding: "20px",
    width: "100%",
    maxWidth: "400px",
}));

const CardGrid = () => (
    <Grid item>
        <CardContainer>
            <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                marginBottom="20px"
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        background: "#7B80E0",
                    }}
                >
                    <PersonIcon></PersonIcon>
                </Box>
                <Typography
                    variant="span"
                    fontSize="16px"
                    fontWeight={600}
                    color="#373946"
                >
                    Total de Usuários
                </Typography>
            </Stack>
            <Stack
                justifyContent="space-between"
                alignItems="end"
                flexDirection="row"
            >
                <Typography variant="span" fontSize="10px" color="#373946">
                    ultimo usuário: 20 / 10 / 2022
                </Typography>
                <Typography
                    variant="span"
                    fontSize="30px"
                    fontWeight={600}
                    color="#373946"
                >
                    40
                </Typography>
            </Stack>
        </CardContainer>
    </Grid>
);

export default function CardAction({ children }) {
    return (
        <Box
            sx={{
                mt: 2,
                mb: 2,
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "30px",
                // maxWidth: "1440px",
            }}
        >
            <Grid
                container
                spacing={2}
                sx={{
                    mt: 2,
                    mb: 2,
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                {children}
            </Grid>
        </Box>
    );
}
