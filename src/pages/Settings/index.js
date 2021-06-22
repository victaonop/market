import { Grid, TextField, TablePagination } from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { GridItem } from '../../components/GridItem/styles';
import { StyledButton as Button } from '../../components/Button/styles';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import GeneralContext from "../../GeneralContext";
import { SettingsGrid } from "./styles";
import { isEmpty } from 'lodash'
import DeleteIcon from '@material-ui/icons/Delete';

const validationSchema = yup.object({
  img: yup.string().required("Obrigatório"),
  title: yup.string().required("Obrigatório"),
  value: yup.string().required("Obrigatório"),
});



function Settings() {
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
      title: "",
      value: "",
      img: "",
    },
  })

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getTableData()
  }, [])

  function getTableData() {
    let produtos = localStorage.getItem('produtos');
    let produtosObj = JSON.parse(produtos);
    setProducts(produtosObj)
  }

  var err = watch("errors")
  console.log(err)

  const {
    snackStatus,
    setSnackStatus,
  } = useContext(GeneralContext)

  function newProduct(value) {
    let produtosString = localStorage.getItem('produtos');
    let produtosObj = JSON.parse(produtosString);
    produtosObj.push(value)
    localStorage.setItem('produtos', JSON.stringify(produtosObj));
    reset();
    setSnackStatus(prevState => ({
      ...prevState,
      open: true,
      text: 'Produto cadastrado com sucesso!',
    }))
    getTableData();
  }

  function removeItem(props) {
    let produtosString = localStorage.getItem('produtos');
    let produtosObj = JSON.parse(produtosString);
    produtosObj.splice(props.tableData.id, 1)
    localStorage.setItem('produtos', JSON.stringify(produtosObj));
    setSnackStatus(prevState => ({
      ...prevState,
      open: true,
      text: 'Produto removido com successo!',
    }))
    getTableData();
  }

  return (
    <>
      <GeneralContext.Provider
        value={{
          snackStatus,
          setSnackStatus,
        }}
      >
        <form
          onSubmit={handleSubmit(newProduct)}
          style={{ width: "100%" }}
          autoComplete="off"
        >
          <GridItem container md={12} style={{ padding: '30px' }}>
            <GridItem xs={12} lg={12} md={12} style={{ textAlign: 'center' }}>
              <h1>Cadastrar produto</h1>
            </GridItem>
            <GridItem xs={9} lg={9} md={9}>
              <Controller
                as={
                  <TextField
                    name="title"
                    style={{ margin: '0px 15px' }}
                    helperText={errors?.title?.message}
                    fullWidth
                    id="title"
                    label="Nome do produto"
                  />
                }
                name="title"
                defaultValue=""
                control={control}
              />
            </GridItem>
            <GridItem xs={3} lg={3} md={3}>
              <Controller
                as={
                  <TextField
                    name="value"
                    style={{ margin: '0px 15px' }}
                    helperText={errors?.value?.message}
                    fullWidth
                    type="number"
                    id="value"
                    label="Preço"
                  />
                }
                name="value"
                defaultValue=""
                control={control}
              />
            </GridItem>
            <GridItem xs={12} lg={12} md={12} style={{ margin: '20px 0px' }}>
              <Controller
                as={
                  <TextField
                    name="img"
                    style={{ margin: '0px 15px' }}
                    helperText={errors?.img?.message}
                    fullWidth
                    id="img"
                    label="Url da Imagem"
                  />
                }
                name="img"
                defaultValue=""
                control={control}
              />
            </GridItem>
            <Grid xs={12} lg={12} md={12} style={{ textAlign: 'right' }}>
              <Button type="submit">Salvar</Button>
            </Grid>
            <SettingsGrid xs={12} lg={12} md={12}>
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
                    title: 'Ações',
                    field: '',
                    render: (props) => (
                      <Grid style={{cursor: 'pointer'}} onClick={() => removeItem(props)}>
                        <DeleteIcon />
                      </Grid>
                    )
                  },
                ]}
                data={products}
              />
            </SettingsGrid>
          </GridItem>
        </form>
      </GeneralContext.Provider>
    </>
  );
}

export default Settings;