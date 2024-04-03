import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { ImageSlider } from "../components/imageSlider/ImageSlider";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import CategoryIcon from '@mui/icons-material/Category';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import HubIcon from '@mui/icons-material/Hub';
import { useTranslation } from "react-i18next";
import Image from "mui-image";
import { useNavigate } from "react-router-dom";
import VideocamIcon from '@mui/icons-material/Videocam';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import { formatDuration, intervalToDuration } from "date-fns";

export default function Main() {
    const { t } = useTranslation();
    const { user, getIdTokenClaims } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        getIdTokenClaims().then(resp => {
        })
            .catch(err => console.log(err))

    }, []);


    const imageSliderProps = {
        autoplay: true,
        imageSources: [
            {
                imageSource: "landing-slider-1.png"
            },
            {
                imageSource: "landing-slider-2.png"
            },
            {
                imageSource: "landing-slider-3.png"
            }
        ]
    }

    return <Grid container spacing={3}>
        <Grid item xs={12}>
            <ImageSlider {...imageSliderProps} />
        </Grid>
        <Grid item xs={12} sx={{
            backgroundColor: (theme) => theme.palette.background.paper
        }}>
            <Container maxWidth="xl" disableGutters sx={{
                py: [8],
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <Card sx={{
                    maxWidth: 345,
                    p: 4
                }}>
                    <CardActionArea>
                        <CardMedia component="div" sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            p: 4
                        }}>
                            <CategoryIcon sx={{
                                fontSize: "72px",
                                color: (theme) => theme.palette.info.main
                            }} />
                        </CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" textAlign="center">
                                {t("Pages.Main.Cards.FirstTitle")}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {t("Pages.Main.Cards.FirstDescription")}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{
                    maxWidth: 345,
                    p: 4
                }}>
                    <CardActionArea>
                        <CardMedia component="div" sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            p: 4
                        }}>
                            <NewReleasesIcon sx={{
                                fontSize: "72px",
                                color: (theme) => theme.palette.success.main
                            }} />
                        </CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" textAlign="center">
                                {t("Pages.Main.Cards.SecondTitle")}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {t("Pages.Main.Cards.SecondDescription")}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{
                    maxWidth: 345,
                    p: 4,
                }}>
                    <CardActionArea>
                        <CardMedia component="div" sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            p: 4
                        }}>
                            <HubIcon sx={{
                                fontSize: "72px",
                                color: (theme) => theme.palette.warning.main
                            }} />
                        </CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" textAlign="center">
                                {t("Pages.Main.Cards.ThirdTitle")}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {t("Pages.Main.Cards.ThirdDescription")}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Container>
        </Grid>
        <Grid item xs={12}>
            <Container maxWidth="xl" disableGutters>
            </Container>
        </Grid>
    </Grid>
}