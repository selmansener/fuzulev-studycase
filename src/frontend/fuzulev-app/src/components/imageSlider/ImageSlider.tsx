import { Box, Grid, useTheme } from "@mui/material";
import { Image } from 'mui-image';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from "react";

export interface ImageSliderItem {
    imageSource: string;
    onClick?: () => void;
}

export interface ImageSliderProps {
    imageSources: ImageSliderItem[];
    autoplay: boolean;
}

export function ImageSlider(props: ImageSliderProps) {
    const { imageSources, autoplay } = props;
    const theme = useTheme();
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(() => {
                if (index == imageSources.length - 1) {
                    setIndex(0);
                }
                else {
                    setIndex(index + 1);
                }
            }, 4000);

            return () => clearInterval(interval);
        }
    }, [index]);

    return <Grid container sx={{
        position: "relative"
    }}>
        <Box sx={{
            "&:hover": {
                backgroundColor: theme.palette.grey[800],
                color: theme.palette.common.white
            },
            position: "absolute",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 4,
            zIndex: 9,
            cursor: "pointer"
        }} onClick={() => {
            if (index == 0) {
                setIndex(imageSources.length - 1);
            }
            else {
                setIndex(index - 1);
            }
        }}>
            <ArrowBackIosIcon />
        </Box>
        {imageSources.map((imageItem, i) =>
            <Grid
                key={i}
                item xs={12} sx={{
                    maxHeight: window.screen.height - 192,
                    display: i == index ? "block" : "none"
                }} onClick={imageItem.onClick}>
                <Image src={imageItem.imageSource} duration={800} showLoading fit="cover" />
            </Grid>
        )}
        <Box sx={{
            "&:hover": {
                backgroundColor: theme.palette.grey[800],
                color: theme.palette.common.white
            },
            position: "absolute",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 4,
            zIndex: 9,
            cursor: "pointer",
            right: 0
        }} onClick={() => {
            if (index == imageSources.length - 1) {
                setIndex(0);
            }
            else {
                setIndex(index + 1);
            }
        }}>
            <ArrowForwardIosIcon />
        </Box>
    </Grid >
}