import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Dialog, DialogTitle, Grid, List, ListItem, TextField, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import React, { useContext, useEffect, useState } from 'react'
import { addToOrder, clearOrder, listCategories, listProducts, removeFromOrder } from '../actions';
import Logo from '../components/Logo';
import { Store } from '../Store';
import {useStyles} from '../styles';
import { useNavigate } from 'react-router-dom';

export default function OrderScreen(props) {
    const styles = useStyles();
    const navigate = useNavigate();
    const [ categoryName, setCategoryName ] = useState('');
    
    const [ quantity, setQuantity ] = useState(1);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ product, setProduct ] = useState({});

    const closeHandler = () => {
        setIsOpen(false);
    };

    const productClickHandler = (p) => {
        setProduct(p);
        setIsOpen(true);
    };

    const addToOrderHandler = () => {
        addToOrder(dispatch, {...product, quantity});
        setIsOpen(false);
    };

    const cancleOrRemoveFromOrder = () => {
        removeFromOrder(dispatch, product);
        setIsOpen(false);
    };

    const { state, dispatch } = useContext(Store);
    const { categories, loading, error } = state.categoryList;
    const { products, loading: loadingProducts, error: errorProducts } = state.productList;
    const { orderItems, itemCounts, totalPrice, taxPrice, orderType } = state.order;
    useEffect(() => {
        if(!categories) {
            listCategories(dispatch);
        } else {
            listProducts(dispatch, categoryName);
        }
    }, [dispatch, categories, categoryName]);
    
    const categoryListHandler = (name) => {
        setCategoryName(name);
        listProducts(dispatch, categoryName);
    }

    const previewOrderHandler = () => {
        navigate('/review');
    }
    return (
        <Box className={styles.root}>
            <Dialog maxWidth="sm" fullWidth={true} open={isOpen} onClose={closeHandler}>
                <DialogTitle className={styles.center}>
                    Add {product.name}
                </DialogTitle>
                <Box className={[styles.row, styles.center]}>
                    <Button variant='contained' color='primary' disabled={quantity === 1} onClick={(e) => quantity > 1 && setQuantity(quantity - 1)}>
                        <RemoveIcon />
                    </Button>
                    <TextField InputProps={{bar: true, inputProps: {className: styles.largeInput}}} className={styles.largeNumber} type="number" variant='filled' min={1} value={quantity} />
                    <Button variant='contained' color='primary' onClick={(e) => setQuantity(quantity + 1)}>
                        <AddIcon />
                    </Button>
                </Box>
                <Box className={[styles.row, styles.around]}>
                    <Button onClick={cancleOrRemoveFromOrder} variant='contained' color='primary' size='large' className={styles.largeButton}>
                        {orderItems.find((x) => x.name === product.name) ? 'Remove From Order' : 'Cancle'}
                    </Button>
                    <Button onClick={addToOrderHandler} variant='contained' color='primary' size='large' className={styles.largeButton}>
                        ADD To Order
                    </Button>
                </Box>
            </Dialog>
            <Box className={styles.main}>
                <Grid container>
                    <Grid item md={2}>
                        <List>
                            {loading ? (
                                <CircularProgress />
                            ) : error ? (
                                <Alert severity="error">{error}</Alert>
                            ) : (
                                <>
                                    <ListItem onClick={() => categoryListHandler('')} button>
                                        <Logo></Logo>
                                    </ListItem>
                                    {categories.map((category) => (
                                        <ListItem button key={category.name} onClick={() => categoryListHandler(category.name)}>
                                            <Avatar alt={category.name} src={category.image}></Avatar>
                                        </ListItem>
                                    ))}
                                </>
                            )}
                        </List>
                    </Grid>
                    <Grid item md={10}>
                        <Typography gutterBottom className={styles.title} variant='h2' component='h2'>
                            {categoryName || 'Main Menu'}
                        </Typography>
                        <Grid container spacing={1}>
                            { loadingProducts ? (
                                <CircularProgress />
                            ) : errorProducts ? (
                                <Alert severity='error'>{errorProducts}</Alert>
                            ) : (
                                products.map((product) => (
                                    <Grid item md={6}>
                                        <Card className={styles.card} onClick={() => productClickHandler(product)}>
                                            <CardActionArea>
                                                <CardMedia component='img' alt={product.name} image={product.image} className={styles.media} />
                                            </CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom color='textPrimary' variant='body' component='p'>
                                                    {product.name}
                                                </Typography>
                                                <Box className={styles.cardFooter}>
                                                    <Typography color='textSecondary' variant='body2' component='p'>
                                                        {product.colorie} Cal
                                                    </Typography>
                                                    <Typography color='textPrimary' variant='body2' component='p'>
                                                        ${product.price}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Box>
                    <Box className={[styles.bordered, styles.space]}>   
                        My Order - {orderType} | Tax: ${taxPrice} | Total: ${totalPrice} | 
                        Items: {itemCounts}
                    </Box>
                    <Box className={[styles.row, styles.around]}>
                        <Button onClick={() => { clearOrder(dispatch); navigate('/'); }} variant='contained' color="primary" className={styles.largeButton}>
                            Cancle Order
                        </Button>
                        <Button onClick={previewOrderHandler} variant='contained' color="primary" disabled={orderItems.length === 0} className={styles.largeButton}>
                            Done
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
