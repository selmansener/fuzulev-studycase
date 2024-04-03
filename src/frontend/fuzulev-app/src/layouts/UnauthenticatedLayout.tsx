import { Box, Container, CssBaseline, Theme, ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { RouteConfig } from "../router/routes";
import { Header, ThemeMode } from "./shared/Header";
import { Footer } from "./shared/Footer";
import { darkThemeOptions, lightThemeOptions } from "../themes";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export function UnauthenticatedLayout() {
    const [themeMode, setThemeMode] = useState<ThemeMode>("light");
    const [theme, setTheme] = useState<Theme>();
    const location = useLocation();
    const { t, i18n } = useTranslation();


    const getTitle = () => {
        const pathName = location.pathname.substring(1, location.pathname.length);

        if (i18n.exists(`Helmet.${pathName}`)) {
            return `${t(`Helmet.${pathName}`)} | FuzulEv`;
        }
        else {
            return "FuzulEv";
        }
    }

    useEffect(() => {
        const newTheme = responsiveFontSizes(themeMode === "light" ? lightThemeOptions : darkThemeOptions, {
            factor: 4
        });

        setTheme(newTheme);
    }, [themeMode]);

    return <React.Fragment>
        {theme && <ThemeProvider theme={theme} >
            <CssBaseline enableColorScheme />
            <Header themeMode={themeMode} changeTheme={(newTheme) => {
                setThemeMode(newTheme);
            }} />
            <Box component={"main"} sx={{
                mt: 18,
                minHeight: window.screen.height - 192,
                mb: 8
            }}>
                <Helmet>
                    <title>{getTitle()}</title>
                </Helmet>
                <Outlet />
            </Box>
            <Footer />
        </ThemeProvider>}
        <ScrollRestoration />
    </React.Fragment>
}

const LandingPage = React.lazy(() => import("../pages/Landing"));

export const unauthenticatedRoutes: RouteConfig = {
    path: "/",
    element: <UnauthenticatedLayout />,
    isPublic: true,
    leafNodes: [
        {
            path: "",
            element: <LandingPage />
        }
    ]
}