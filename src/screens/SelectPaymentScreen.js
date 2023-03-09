import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { setPaymentType } from '../actions';
import Logo from '../components/Logo';
import { Store } from '../Store';
import { useStyles } from '../styles';

export default function SelectPaymentScreen() {
    const navigate = useNavigate();
    const { dispatch } = useContext(Store);
    const styles = useStyles();
    const selectHandler = (paymentType) => {
        setPaymentType(dispatch, paymentType);
        if(paymentType === 'Pay here') {
            navigate('/payment');
        } else {
            navigate('/complete');
        }
    }
    return (
        <Box className={[styles.root, styles.navy]}>
            <Box className={[styles.main, styles.center]}>
                <Logo large></Logo>
                <Typography gutterBottom className={styles.center} variant='h3' component='h3'>
                    Select Payment Method
                </Typography>
            </Box>
            <Box className={styles.cards}>
                <Card className={[styles.card, styles.space]}>
                    <CardActionArea onClick={() => selectHandler('Pay here')}>
                        <CardMedia component="img" alt='Pay here' image='/images/payhere.png' className={styles.media}/>
                    </CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant='h6' color='textPrimary' component='p'>
                            PAY HERE
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={[styles.card, styles.space]}>
                    <CardActionArea onClick={() => selectHandler('At counter')}>
                        <CardMedia component="img" alt='Pay here' image='/images/atcounter.png' className={styles.media}/>
                    </CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant='h6' color='textPrimary' component='p'>
                            AT COUNTER
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}
