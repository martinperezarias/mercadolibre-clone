import { BrowserRouter, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext'

import HomePage from './Pages/HomePage/HomeIndex';
import LoginPage from './Pages/LoginPage';
import DetailPage from './Pages/DetailPage';
import CreditPage from './Pages/CreditPage/CreditIndex';
import RegisterPage from './Pages/RegisterPage';
import AddProductPage from './Pages/AddProductPage';
import ModifyProductPage from './Pages/ModifyPage/ModIndex';
import Menu from './Components/Menu';
import PrivateRoute from './PrivateRoute'


function App() {

  return (
      <BrowserRouter>
        <AuthProvider>
            <Menu/>
            <div style={{backgroundColor: "#e7e7e7", minHeight: "100vh"}}>
              <PrivateRoute path='/' component={HomePage} exact/>
              <Route path='/login' component={LoginPage} exact/>
              <Route path='/register' component={RegisterPage} exact/>
              <PrivateRoute path='/add' component={AddProductPage} exact/>
              <PrivateRoute path='/modify/:id' component={ModifyProductPage} exact/>
              <PrivateRoute path='/producto/:id' component={DetailPage} exact/>
              <PrivateRoute path='/compra/:id' component={CreditPage} exact/> 
            </div>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
