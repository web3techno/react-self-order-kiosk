import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../actions';
import Logo from '../components/Logo';
import { Store } from '../Store'
import { useStyles } from '../styles';

export default function CompleteOrderScreen() {
    const navigate = useNavigate();
    const styles = useStyles();
    const {state, dispatch} = useContext(Store);
    const {order} = state;
    const {loading, error, newOrder} = state.orderCreate;

    useEffect(() => {
        if(order.orderItems.length > 0) {
            createOrder(dispatch, order);
        }
    }, [order]);

    return (
        <Box className={[styles.root, styles.navy]}>
            <Box className={[styles.main, styles.center]}>
                <Box>
                    <Logo large></Logo>
                    {loading ? (
                        <CircularProgress />
                    ) : error ? (
                        <Alert severity='error'>{error}</Alert>
                    ) : (
                        <>
                            <Typography gutterBottom className={styles.title} variant='h3' component='h3'>
                                Your order has been placed
                            </Typography>
                            <Typography gutterBottom className={styles.title} variant='h1' component='h1'>
                                Thank you!
                            </Typography>
                            <Typography gutterBottom className={styles.title} variant='h3' component='h3'>
                                Your order number is {newOrder.number}
                            </Typography>
                        </>
                    )}
                </Box>
            </Box>
            <Box className={[styles.center, styles.space]}>
                <Button onClick={() => navigate('/')} variant='contained' color='primary' className={styles.largeButton}> 
                    Order Again
                </Button>
            </Box>
        </Box>
    )
}
