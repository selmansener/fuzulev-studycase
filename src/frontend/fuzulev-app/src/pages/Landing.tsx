import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { ImageSlider } from "../components/imageSlider/ImageSlider";
import { useGetApiV1PlaylistsFeaturedQuery } from "../store/api";
import CategoryIcon from '@mui/icons-material/Category';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import HubIcon from '@mui/icons-material/Hub';
import Image from "mui-image";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import VideocamIcon from '@mui/icons-material/Videocam';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import { formatDuration, intervalToDuration } from "date-fns";

export default function Landing() {
    const { t } = useTranslation();
    const { data } = useGetApiV1PlaylistsFeaturedQuery();
    const navigate = useNavigate();

    const imageSliderProps = {
        autoplay: true,
        imageSources: [
            {
                imageSource: "/landing-slider-1.png"
            },
            {
                imageSource: "/landing-slider-2.png"
            },
            {
                imageSource: "/landing-slider-3.png"
            }
        ]
    }

    return <Grid container spacing={3}>
    </Grid>
}