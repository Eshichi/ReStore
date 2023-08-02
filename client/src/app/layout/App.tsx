import { useState } from "react";
import { Catalog } from "../../features/catalog/Catalog";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Header } from "./Header";


function App() {
  const [darkMode , setDarkMode] = useState(true);
  const paletteType = darkMode? 'dark' : "light";
  const theme = createTheme({
    palette : {
      mode : paletteType,
      background: {
        default : paletteType === "dark" ? '#121212' : '#eaeaea' 
      }
    }
  })

  const themeChange = () =>{
    setDarkMode(!darkMode)
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} themeChange={themeChange} />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
