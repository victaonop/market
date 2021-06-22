import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import TitlebarGridList from "../../components/Grade";
import { GridItem } from "../../components/GridItem/styles";



function Home() {
    return (
        <>
            <Grid>
                <GridItem xs={12} lg={12} md={12} style={{ textAlign: 'center', marginBottom: '15px'}}>
                    <h1>Loja</h1>
                </GridItem>
                <TitlebarGridList />
            </Grid>
        </>
    );
}

export default Home;
