import { useAuth0 } from "@auth0/auth0-react";
import { AppBar, Avatar, Box, Button, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import { Authenticated } from "../../pages/auth/Authenticated";
import { config } from "../../config";
import { Unauthenticated } from "../../pages/auth/Unauthenticated";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { Image } from "mui-image";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

interface UserMenuProps {
    anchorElUser: HTMLElement | null;
    handleClose: () => void;
}

function UserMenu(props: UserMenuProps) {
    const { t } = useTranslation();
    const { logout } = useAuth0();
    const { anchorElUser, handleClose } = props;

    return <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={anchorElUser != null}
        onClose={handleClose}
    >
        <MenuItem key={"profile"} onClick={handleClose}>
            <Typography textAlign="center">Profile</Typography>
        </MenuItem>
        <MenuItem key={"logout"} onClick={() => {
            logout({
                clientId: config.authConfig.clientId,
                logoutParams: {
                    returnTo: config.authConfig.redirectUri
                }
            });
        }}>
            <Typography textAlign="center">
                {t("Auth.Logout")}
            </Typography>
        </MenuItem>
    </Menu>
}

const menuItems = [
    {
        name: "MenuItem.About",
        route: "/about"
    }
]

const container = window !== undefined ? () => window.document.body : undefined;

interface SideBarMenuProps {
    isOpen: boolean;
    handleDrawerToggle: () => void;
}

function SideBarMenu(props: SideBarMenuProps) {
    const { isOpen, handleDrawerToggle } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();

    return <nav>
        <Drawer
            container={container}
            variant="temporary"
            open={isOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
            }}>
            <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
                <List>
                    {menuItems.map((item, i) => (
                        <ListItem key={i} disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary={t(item.name)} onClick={() => {
                                    navigate(item.route)
                                }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    </nav>
}

interface MenuButtonProps {
    name: string;
    route: string;
}

const MenuButton = (props: MenuButtonProps) => {
    const { name, route } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();

    return <Box
        sx={{
            transition: "all 0.2s ease-in-out",
            boxSizing: "border-box",
            cursor: "pointer",
            p: 1,
            m: 1,
            outline: "1px solid #fff",
            border: "2px solid transparent",
            "&:hover": {
                outline: "1px solid transparent",
                border: "2px solid #fff",
                borderWidth: 2,
                borderStyle: "solid",
                borderRadius: (theme) => theme.shape.borderRadius / 2,
                borderColor: (theme) => theme.palette.common.white
            },
            backgroundColor: (theme) => theme.palette.primary.main
        }}
        onClick={() => {
            navigate(route);
        }}>
        <Typography>
            {t(name)}
        </Typography>
    </Box>
}

export type ThemeMode = "light" | "dark";

export interface HeaderProps {
    themeMode: string;
    changeTheme: (mode: ThemeMode) => void;
}

export function Header(props: HeaderProps) {
    const { themeMode, changeTheme } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { loginWithRedirect } = useAuth0();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setIsDrawerOpen((prevState) => !prevState);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    return <AppBar sx={{
        justifyContent: "center",
        height: 104,
        px: [2],
        backgroundColor: (theme) => theme.palette.background.paper
    }}>
        <Grid container spacing={2} sx={{
            alignContent: "center"
        }}>
            <Grid item container xs={4} spacing={2}>
                <Grid item xs={2} display={{ sm: 'none' }}>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={10} sx={{
                    cursor: "pointer"
                }}
                    onClick={() => {
                        navigate("/");
                    }}>
                    <Image src="/logo.png" width={192} />
                </Grid>
            </Grid>
            <Grid item container xs={8} spacing={2} display="flex" sx={{
                justifyContent: "flex-end",
                alignContent: "center"
            }}>
                <Grid item>
                    <SideBarMenu isOpen={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />
                    <Box sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: "row"
                    }}>
                        {menuItems.map((item, i) => (
                            <MenuButton key={i} {...item} />
                        ))}
                    </Box>
                </Grid>
                <Grid item sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <MaterialUISwitch onChange={(e) => {
                        const newTheme = themeMode == "light" ? "dark" : "light";
                        changeTheme(newTheme);
                    }} />
                </Grid>
                <Grid item sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Authenticated>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                        <UserMenu anchorElUser={anchorElUser} handleClose={() => {
                            setAnchorElUser(null);
                        }} />
                    </Authenticated>
                    <Unauthenticated>
                        <Button variant="contained" onClick={() => {
                            loginWithRedirect({
                                authorizationParams: {
                                    audience: config.authConfig.audience,
                                    redirect_uri: config.authConfig.redirectUri,
                                    prompt: "login",
                                    scope: config.authConfig.scopes.join(" "),
                                    ui_locales: "tr en-GB"
                                }
                            });
                        }}>
                            {t("Auth.Login")}
                        </Button>
                    </Unauthenticated>
                </Grid>
            </Grid>
        </Grid >
    </AppBar>
}