import { Theme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import { Box, Container, CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { RouteConfig } from "../router/routes";
import { Header, ThemeMode } from "./shared/Header";
import { Footer } from "./shared/Footer";
import { darkThemeOptions, lightThemeOptions } from "../themes";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export function AuthenticatedLayout() {
    const { t, i18n } = useTranslation();
    const [themeMode, setThemeMode] = useState<ThemeMode>("light");
    const [theme, setTheme] = useState<Theme>();
    const location = useLocation();

    useEffect(() => {
        const newTheme = responsiveFontSizes(themeMode === "light" ? lightThemeOptions : darkThemeOptions, {
            factor: 4
        });

        setTheme(newTheme);
    }, [themeMode]);

    const getTitle = () => {
        const pathName = location.pathname.substring(1, location.pathname.length);

        if (i18n.exists(`Helmet.${pathName}`)) {
            return `${t(`Helmet.${pathName}`)} | FuzulEv`;
        }
        else {
            return "FuzulEv";
        }
    }

    return <React.Fragment>
        {theme && <ThemeProvider theme={theme}  >
            <CssBaseline enableColorScheme />
            <Header themeMode={themeMode} changeTheme={(newTheme) => {
                setThemeMode(newTheme);
            }} />
            <Box component={"main"} sx={{
                mt: 12,
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

const MainPage = React.lazy(() => import("../pages/Main"));
const EmailVerifiedPage = React.lazy(() => import("../pages/auth/EmailVerified"));

export const authenticatedRoutes: RouteConfig = {
    path: "/",
    element: <AuthenticatedLayout />,
    isPublic: false,
    leafNodes: [
        {
            path: "email-verified",
            element: <EmailVerifiedPage />
        },
        {
            path: "",
            element: <MainPage />
        }
    ]
}