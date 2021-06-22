import React, { useState, useEffect, useContext } from "react";
import { Grid, TablePagination } from "@material-ui/core";
import MaterialTable from "material-table";
import { GridItem } from "../../components/GridItem/styles";
import { isEmpty } from 'lodash'
import { HistoryGrid } from "./styles";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import GeneralContext from "../../GeneralContext";
import * as moment from "moment";

const validationSchema = yup.object({
  name: yup.string().required("Obrigatório"),
});

function PurchaseHistory() {

  const [history, setHistory] = useState([])

  useEffect(() => {
    getTableData()
  }, [])

  function getTableData() {
    let purchaseHistory = localStorage.getItem('purchaseHistory');
    let purchaseHistoryObj = JSON.parse(purchaseHistory);
    if (isEmpty(purchaseHistoryObj)) {
      purchaseHistoryObj = [];
    }
    setHistory(purchaseHistoryObj)
  }

  const {
    snackStatus,
    setSnackStatus,
  } = useContext(GeneralContext)





  return (
    <>

      <GeneralContext.Provider
        value={{
          snackStatus,
          setSnackStatus,
        }}
      >
        <GridItem xs={12} lg={12} md={12} style={{ textAlign: 'center', marginBottom: '15px' }}>
          <h1>Historico de Compras</h1>
        </GridItem>
        <HistoryGrid>
          <Grid xs={12} lg={12} md={12}>
            <MaterialTable
              style={{ width: '100%' }}
              components={{
                Pagination: props => {
                  return (
                    <TablePagination
                      {...props}
                    />
                  )
                },
              }}
              title=""
              localization={{
                body: {
                  emptyDataSourceMessage:
                    'Nenhuma compra realizada',
                },
              }}
              options={{
                emptyRowsWhenPaging: false,
                search: false,
                toolBar: false,
                pageSize: 999,
                sorting: false,
              }}
              columns={[
                {
                  title: 'Data da compra',
                  field: 'purchaseDate',
                  render: (props) => (
                    <Grid style={{ textAlign: 'left' }}>
                      {moment(props.purchaseDate).format("DD/MM/yy - HH:mm")}
                    </Grid>
                  )
                },
                {
                  title: 'Comprador',
                  field: 'owner',
                },
                {
                  title: 'Quantidade',
                  field: 'qnt',
                  render: (props) => (
                    <Grid style={{ textAlign: 'left' }}>
                      {props.qnt}
                    </Grid>
                  )
                },
                {
                  title: 'Nome do produto',
                  field: 'title',
                },
                {
                  title: 'Valor un.',
                  field: 'value',
                  render: (props) => (
                    <span>$ {props.value}</span>
                  )
                },
                {
                  title: 'Valor total',
                  field: 'value',
                  render: (props) => (
                    <span>$ {props.value * props.qnt}</span>
                  )
                },
              ]}
              data={history}
            />
          </Grid>
        </HistoryGrid>
      </GeneralContext.Provider>

    </>
  );
}

export default PurchaseHistory;