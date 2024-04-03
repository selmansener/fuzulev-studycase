import { createTheme } from '@mui/material/styles';

// Light Theme Options
const lightThemeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6C63FF', // Purple
    },
    secondary: {
      main: '#FF8C42', // Orange
    },
    error: {
      main: '#FF5252', // Red
    },
    warning: {
      main: '#FFC107', // Yellow
    },
    info: {
      main: '#2196F3', // Blue
    },
    success: {
      main: '#4CAF50', // Green
    },
    text: {
      primary: '#212121', // Dark Grey
      secondary: '#757575', // Grey
    },
    background: {
      default: '#F5F5F5', // Light Grey
      paper: '#FFFFFF', // White
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          "&.Mui-expanded": {
            "margin": 0
          }
        }
      }
    }
  }
});

// Dark Theme Options
const darkThemeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6C63FF', // Purple
    },
    secondary: {
      main: '#FF8C42', // Orange
    },
    error: {
      main: '#FF5252', // Red
    },
    warning: {
      main: '#FFC107', // Yellow
    },
    info: {
      main: '#2196F3', // Blue
    },
    success: {
      main: '#4CAF50', // Green
    },
    text: {
      primary: '#FFFFFF', // White
      secondary: '#BDBDBD', // Light Grey
    },
    background: {
      default: '#121212', // Dark Grey
      paper: '#1E1E1E', // Darker Grey
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          "&.Mui-expanded": {
            "margin": 0
          }
        }
      }
    }
  }
});

export { lightThemeOptions, darkThemeOptions };
