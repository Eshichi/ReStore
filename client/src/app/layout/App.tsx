import { useEffect, useState } from "react";
import { Catalog } from "../../features/catalog/Catalog";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useStoreContext } from "../context/StoreContext";
import agent from "../api/agent";
import { getCookie } from "../util/util";
import { LoadingComponent } from "./LoadingComponent";
import { useDispatch } from "react-redux";
import { setBasket } from "../../features/basket/basketSlice";


function App() {
  // const {setBasket} = useStoreContext();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [darkMode , setDarkMode] = useState(true);
  const paletteType = darkMode? 'dark' : "light";


  useEffect(() =>{
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
      .then(basket => dispatch(setBasket(basket)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
    } else {
      setLoading(false);
    }
  },[dispatch])

  const theme = createTheme({
    palette : {
      mode : paletteType,
      background: {
        default : paletteType === "dark" ? '#121212' : '#eaeaea' 
      }
    }
  })

  if(loading) return <LoadingComponent message="Initialising app.." />

  const themeChange = () =>{
    setDarkMode(!darkMode)
  }
  
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"></ToastContainer>
      <CssBaseline />
      <Header darkMode={darkMode} themeChange={themeChange} />
      <Container>
        {/* <Catalog /> */}
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
