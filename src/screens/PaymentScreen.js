import { Box, Button, CircularProgress, Typography } from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { useStyles } from '../styles';

export default function PaymentScreen() {
    const navigate = useNavigate();
    const styles = useStyles();
    return (
        <Box className={[styles.root, styles.navy]}>
            <Box className={[styles.main, styles.center]}>
                <Box>
                    <Logo large></Logo>
                    <Typography gutterBottom className={styles.title} variant='h3' component='h3'>
                        Please follow the instruction on the PIN pad
                    </Typography>
                    <CircularProgress />
                </Box>
            </Box>
            <Box className={[styles.center, styles.space]}>
                <Button onClick={() => navigate('/complete')} variant='contained' color='primary' className={styles.largeButton}> 
                    Complete Order
                </Button>
            </Box>
        </Box>
    )
}
