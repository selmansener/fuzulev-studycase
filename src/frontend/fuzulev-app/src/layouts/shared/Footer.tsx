import { Box, Container, Grid, Link, List, ListItem, MenuItem, PaletteMode, Select, SelectChangeEvent, Typography, useTheme } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image } from "mui-image";
import { useNavigate } from "react-router-dom";
import { setDefaultOptions } from "date-fns";
import { enGB, tr } from 'date-fns/locale'

const socialMediaItems = [
    {
        link: "https://facebook.com",
        icon: <FacebookIcon fontSize="large" />
    },
    {
        link: "https://twitter.com",
        icon: <XIcon fontSize="large" />
    },
    {
        link: "https://instagram.com",
        icon: <InstagramIcon fontSize="large" />
    },
    {
        link: "https://linkedin.com",
        icon: <LinkedInIcon fontSize="large" />
    }
]

const SocialMediaButtons = () => {
    const theme = useTheme();

    return <Box>
        {socialMediaItems.map((item, i) =>
            <Link key={i} href={item.link}
                target="_blank"
                color={theme.palette.mode == "light" ? "#0C4459" : theme.palette.common.white}
                sx={{
                    mx: 1
                }}
            >
                {item.icon}
            </Link>
        )}
    </Box>
}


const supportedLanguages = [
    {
        code: "tr",
        lang: "Türkçe",
        iconCode: "tr"
    },
    {
        code: "en",
        lang: "English",
        iconCode: "us"
    },
]



export function Footer() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();


    const handleLanguageChange = (event: SelectChangeEvent) => {
        let lang;
        switch (event.target.value) {
            case "en":
            case "en-GB":
            case "en-US":
                lang = "en";
                break;
            case "tr":
                lang = "tr";
        }

        i18n.changeLanguage(lang);

        if (lang == "en") {
            setDefaultOptions({ locale: enGB });
        } else {
            setDefaultOptions({ locale: tr });
        }
    }

    const getLanguage = () => {
        switch (i18n.language) {
            case "en-GB":
            case "en-US":
            case "en":
                return "en";
            case "tr-TR":
            case "tr":
            default:
                return "tr";
        }
    }

    return <Box component={"footer"} sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        color: (theme) => theme.palette.mode == "light" ? theme.palette.common.black : theme.palette.common.white,
        boxShadow: (theme) => theme.shadows[10]
    }}>
        <Container maxWidth="xl" disableGutters>
            <Grid container spacing={3}>
                <Grid item xs={2} sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center"
                }}>
                    <Box sx={{
                        cursor: "pointer"
                    }} onClick={() => navigate("/")}>
                        <Image src="/footer-logo.png" fit="cover" width={148} height="unset" />
                    </Box>
                    <SocialMediaButtons />
                </Grid>
                <Grid item xs={1}>
                    <Select
                        value={getLanguage()}
                        onChange={handleLanguageChange}
                        sx={{ mr: 2 }}
                    >
                        {supportedLanguages.map(supportedLang => (
                            <MenuItem value={supportedLang.code} key={supportedLang.lang}>
                                <img
                                    loading="lazy"
                                    width="20"
                                    src={`https://flagcdn.com/w20/${supportedLang.iconCode}.png`}
                                    srcSet={`https://flagcdn.com/w40/${supportedLang.iconCode}.png 2x`}
                                    alt={supportedLang.code}
                                />
                                <Typography variant="caption" sx={{ pl: 1 }}>
                                    {supportedLang.lang}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>
        </Container>
    </Box>
}