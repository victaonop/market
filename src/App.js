import React, { useState } from "react";
import Routes from "./routes";
import SideMenu from "./components/SideMenu";
import { Grid } from "@material-ui/core";
import "./App.css";
import { PageContainer } from './components/PageContainer/styles';
import SnackDefault from "./components/SnackDefault";
import GeneralContext from './GeneralContext';

function App() {
  const [snackStatus, setSnackStatus] = useState({
    open: false,
    severity: 'success',
    text: 'Operação realizada com sucesso !',
  })
  return (
    <>
      <GeneralContext.Provider
        value={{
          snackStatus,
          setSnackStatus,
        }}
      >
      <Grid conteiner md={12} style={{ display: 'flex' }}>
        <SnackDefault
          snackStatus={snackStatus} 
          handleCloseSnack={() => setSnackStatus({ open: false })} 
        />
        <Grid md={3}>
          <SideMenu />
        </Grid>
        <PageContainer conteiner md={9}>
          <Routes />
        </PageContainer>
      </Grid>
      </GeneralContext.Provider>
    </>
  );
}

export default App;


