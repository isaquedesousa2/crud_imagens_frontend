// COMPONENTE DE EXIBICAO DAS IMAGENS

import { Box, Grid } from "@mui/material";
import React from "react";

export default function ImageContainer({ children }) {
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
