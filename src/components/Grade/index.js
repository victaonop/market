import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import { Grid } from '@material-ui/core';
import { CustomPagination } from '../Pagination/styles.js';
import Pagination from '@material-ui/lab/Pagination';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { isEmpty } from 'lodash'
import GeneralContext from '../../GeneralContext/index.js';
import { productsBase } from '../../pages/utils/utils.js';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: '#e9e9e9',
    },
    gridList: {
        width: '100%',
        height: 620,
    },
    icon: {
        color: '#fff',
    },

}));


export default function TitlebarGridList() {
    const pgSize = 6;
    const classes = useStyles();
    const [products, setProducts] = useState([])
    const [pagination, setPagination] = useState({
        currentPage: 1,
        pageCount: 1,
        pageSize: pgSize,
        recordCount: 1,
    });

    const {
        snackStatus,
        setSnackStatus,
    } = useContext(GeneralContext)

    async function getProducts(page) {
        try {
            if (!page) {
                page = 1;
            }
            let produtosString = localStorage.getItem('produtos');
            let produtosObj = JSON.parse(produtosString);
            var sliced =
                produtosObj.slice((page - 1) * pgSize, page * pgSize).map((item) => ({
                    ...item,
                }));
            var pageNumber = (produtosObj.length + pgSize - 1) / pgSize;
            setPagination({
                currentPage: page,
                pageCount: Math.floor(pageNumber)
            })
            setProducts(sliced);
        } catch (error) {
        } finally {
        }
    }

    function cartAdd(produto) {
        let cartItens = localStorage.getItem('cartItens');
        let cartItensObj = JSON.parse(cartItens);
        var list = cartItensObj;
        var increment = false;
        if (!isEmpty(list)) {
            list.forEach(item => {
                if (item.title == produto.title) {
                    item.qnt++
                    increment = true;
                }
            });
        }else {
            var list = [];
        }
        if(!increment) {
            produto.qnt = 1
            list.push(produto)
        }
        localStorage.setItem('cartItens', JSON.stringify(list));
        setSnackStatus(prevState => ({
            ...prevState,
            open: true,
            text: produto.title + " adicionado ao carrinho",
        }))
    }

    useEffect(() => {
        let getId = localStorage.getItem('id');
        if (!getId) {
            const uuidv4 = require("uuid/v4")
            var id = uuidv4()
            localStorage.setItem('id', JSON.stringify(id));
            let bProdutos = productsBase
            localStorage.setItem('produtos', JSON.stringify(bProdutos));
        }
        getProducts();
    }, []);

    return (
        <>
            <GeneralContext.Provider
                value={{
                    snackStatus,
                    setSnackStatus,
                }}
            >
                <div className={classes.root}>
                    <GridList cols={3} spacing={25} cellHeight={280} className={classes.gridList}>
                        {products.map((product, index) => (
                            <GridListTile key={product.img}>
                                <img src={product.img} alt={product.title} />
                                <GridListTileBar
                                    title={product.title}
                                    subtitle={<span>Preço: $: {product.value}</span>}
                                    actionIcon={
                                        <IconButton aria-label={`info about ${product.title}`} className={classes.icon} onClick={() => cartAdd(product)}>
                                            <AddShoppingCartIcon />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
                <CustomPagination>
                    <div className={classes.root}>
                        <Pagination
                            color="secondary"
                            selected
                            count={pagination.pageCount}
                            page={pagination.currentPage}
                            onChange={(_, page) => {
                                getProducts(page);
                            }}
                            showFirstButton
                            showLastButton
                        />
                    </div>
                </CustomPagination>
            </GeneralContext.Provider>
        </>
    );
}