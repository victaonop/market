import { Grid, TablePagination, TextField } from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useState, useEffect, useContext } from "react";
import { GridItem } from "../../components/GridItem/styles";
import { isEmpty } from 'lodash'
import { CartGrid } from "./styles";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import GeneralContext from "../../GeneralContext";
import { StyledButton as Button } from '../../components/Button/styles';

const validationSchema = yup.object({
  name: yup.string().required("Obrigatório"),
});

function Cart() {
  const [products, setProducts] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const {
    control,
    watch,
    errors,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: "",
    },
  })

  useEffect(() => {
    getTableData()
  }, [])

  function getTableData() {
    let cartItens = localStorage.getItem('cartItens');
    let cartItensObj = JSON.parse(cartItens);
    if (isEmpty(cartItensObj)) {
      cartItensObj = [];
    }
    setProducts(cartItensObj)
    var sum = 0;
    if (!isEmpty(cartItensObj)) {
      cartItensObj.forEach(item => {
        sum = sum + (item.value * item.qnt)
      });
    }
    setTotalValue(sum)
  }

  function getAmount(props) {
    return (
      <Grid style={{ display: "flex", justifyContent: 'left' }}>
        {
          props.qnt == 1 ?
            <div onClick={() => changeAmount("remove", props)}>
              <CloseIcon className="amount__Button" />
            </div>
            :
            <div onClick={() => changeAmount("substract", props)}>
              <RemoveIcon className="amount__Button" />
            </div>
        }
        <Grid style={{ margin: "0px 10px" }}>
          {props.qnt}
        </Grid>
        <div onClick={() => changeAmount("add", props)}>
          <AddIcon className="amount__Button" />
        </div>
      </Grid>
    )
  }

  function changeAmount(action, props) {
    let cartItens = localStorage.getItem('cartItens');
    let cartItensObj = JSON.parse(cartItens);
    var list = cartItensObj;
    switch (action) {
      case "add":
        list[props.tableData.id].qnt++
        break;
      case "substract":
        list[props.tableData.id].qnt--
        break;
      case "remove":
        list.splice(props.tableData.id, 1)
        break;

      default:
        break;
    }
    console.log("list.id", list)
    localStorage.setItem('cartItens', JSON.stringify(list));
    getTableData()
  }

  const {
    snackStatus,
    setSnackStatus,
  } = useContext(GeneralContext)


  function completePurchase(value) {
    let cartItens = localStorage.getItem('cartItens');
    let cartItensObj = JSON.parse(cartItens);
    let purchaseHistory = localStorage.getItem('purchaseHistory');
    let purchaseHistoryObj = JSON.parse(purchaseHistory);
    console.log("cartItens", cartItensObj)
    console.log("purchaseHistory", purchaseHistoryObj)
    if (isEmpty(purchaseHistoryObj)) {
      cartItensObj.forEach(item => {
        item.owner = value.name;
        item.purchaseDate = new Date();
      });
      localStorage.setItem('purchaseHistory', JSON.stringify(cartItensObj));
    }
    else {
      purchaseHistoryObj.push(...cartItensObj)
      purchaseHistoryObj.forEach(item => {
        item.owner = value.name;
        item.purchaseDate = new Date();
      });
      localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistoryObj));
    }
    localStorage.removeItem('cartItens');
    reset();
    setSnackStatus(prevState => ({
      ...prevState,
      open: true,
      text: 'Compra finalizada!',
    }))
    getTableData();
  }


  return (
    <>

      <form
        onSubmit={handleSubmit(completePurchase)}
        style={{ width: "100%" }}
        autoComplete="off"
      >
        <GeneralContext.Provider
          value={{
            snackStatus,
            setSnackStatus,
          }}
        >
          <GridItem xs={12} lg={12} md={12} style={{ textAlign: 'center', marginBottom: '15px' }}>
            <h1>Meu carrinho</h1>
          </GridItem>
          <GridItem xs={6} lg={6} md={6} style={{ marginBottom: '15px' }}>
            <Controller
              as={
                <TextField
                  name="name"
                  style={{ margin: '0px 15px' }}
                  helperText={errors?.name?.message}
                  fullWidth
                  id="name"
                  label="Insira seu nome"
                />
              }
              name="name"
              defaultValue=""
              control={control}
            />
          </GridItem>
          <CartGrid>
            <Grid xs={12} lg={12} md={12}>
              <MaterialTable
                style={{ width: '100%' }}
                components={{
                  Pagination: props => {
                    return (
                      <TablePagination
                        {...props}
                        rowsPerPageOptions={[999]}
                        rowsPerPage={999}
                      />
                    )
                  },
                }}
                title=""
                rowsPerPageOptions={[999]}
                rowsPerPage={999}
                localization={{
                  body: {
                    emptyDataSourceMessage:
                      'Nenhum item no carrinho',
                  },
                }}
                options={{
                  emptyRowsWhenPaging: false,
                  pageSize: 999,
                  search: false,
                  toolBar: false,
                  sorting: false,
                }}
                columns={[
                  {
                    title: 'Quantidade',
                    field: 'qnt',
                    render: (props) => (
                      getAmount(props)
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
                data={products}
              />
            </Grid>
            <Grid xs={12} lg={12} md={12} style={{ textAlign: 'right', marginTop: '20px' }}>
              <Grid>Total da compra: $ {totalValue}</Grid>
            </Grid>
            <Grid xs={12} lg={12} md={12} style={{ textAlign: 'right', marginTop: '20px' }}>
              <Button type="submit">finalizar compra</Button>
            </Grid>
          </CartGrid>
        </GeneralContext.Provider>
      </form>
    </>
  );
}

export default Cart;