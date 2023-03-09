import React, { useContext } from 'react';
import './App.css';
import { Container, createTheme, CssBaseline, Paper, ThemeProvider } from '@material-ui/core';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChooseScreen from './screens/ChooseScreen';
import OrderScreen from './screens/OrderScreen';
import ReviewScreen from './screens/ReviewScreen';
import SelectPaymentScreen from './screens/SelectPaymentScreen';
import PaymentScreen from './screens/PaymentScreen';
import CompleteOrderScreen from './screens/CompleteOrderScreen';
import AdminScreen from './screens/AdminScreen';
import { Store } from './Store';
import QueueScreen from './screens/QueueScreen';

const theme = createTheme({
  typography: {
    h1 : {
      fontWeight: 'bold'
    },
    h2 : {
      fontSize: '2rem',
      color: 'black'
    },
    h3 : {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: 'white'
    },
  },
  palette: {
    primary: {
      main: '#ff1744'
    },
    secondary : {
      main: '#118e16',
      contrastText: '#ffffff'
    }
  }
});
function App() {
  const {state} = useContext(Store);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth={state.widthScreen ? 'lg' : 'sm'}>
          <Paper>
            <Routes>
              <Route path='/' element={<HomeScreen/>}></Route>
              <Route path='/choose' element={<ChooseScreen/>}></Route>
              <Route path='/order' element={<OrderScreen/>}></Route>
              <Route path='/review' element={<ReviewScreen/>}></Route>
              <Route path='/select-payment' element={<SelectPaymentScreen/>}></Route>
              <Route path='/payment' element={<PaymentScreen/>}></Route>
              <Route path='/complete' element={<CompleteOrderScreen/>}></Route>
              <Route path='/admin' element={<AdminScreen/>}></Route>
              <Route path='/queue' element={<QueueScreen/>}></Route>
            </Routes>
          </Paper>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
