// COMPONENTE MODAL

import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import React from "react";

export default function ModalCustom({
    open,
    handleModal,
    handleAddImage,
    setName,
    setImage,
}) {
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
                    m: 2,
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
}
