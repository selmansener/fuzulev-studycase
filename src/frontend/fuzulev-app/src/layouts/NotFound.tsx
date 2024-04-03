import { Box, Button, Container, Grid, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { config } from "../config";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { cdnImg: imgBaseHost } = config;
    const theme = useTheme();

    return (

        <Box component="main" sx={{
            bgcolor: 'secondary.transparent'
        }}>
            <Helmet>
                <title>FuzulEv</title>
            </Helmet>
            <Container>

                <Grid container alignItems="center" spacing={2}>
                    <Grid item container xs={4} direction="column" alignItems="center" spacing={4}>
                        <Grid item xs={12} >
                            <Typography variant="h1" color="primary">
                                {t("Pages.NotFound.Message")}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                size="large"
                                variant="outlined"
                                color="secondary"
                                sx={{
                                    ml: 4
                                }}
                                onClick={() => {
                                    navigate(-1);
                                }}>

                                <Typography variant="h5" color="primary">
                                    {t("Pages.NotFound.ReturnToPreviousPage")}
                                </Typography>
                            </Button>
                            <Button
                                size="large"
                                variant="contained"
                                color="primary"
                                sx={{
                                    ml: 2
                                }}
                                onClick={() => {
                                    navigate("/", {
                                        replace: true
                                    });
                                }}>
                                <Typography variant="h5" color="white">
                                    {t("Pages.NotFound.ReturnToHome")}
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={8} textAlign="center" sx={{
                        display: 'flex'
                    }}>
                        <img src={`${imgBaseHost}/not-found/not-found-404.svg`} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}