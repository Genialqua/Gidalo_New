import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import  'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import PropertyScreen from './screens/PropertyScreen';
import FavouriteScreen from './screens/favouritesScreen';
import ForSaleScreen from './screens/forSale.jsx';
import DistressSaleScreen from './screens/distressSale.jsx';
import DubaiPropertiesScreen from './screens/DubaiProperties.jsx';
import ForRentScreen from './screens/forRent.jsx';
import SharedApartmentScreen from './screens/sharedApartment.jsx';
import ShortLetsScreen from './screens/shortLets.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/home" element={<HomeScreen/>} />
      <Route path="/property/:id" element={<PropertyScreen/>} />
      <Route path="/favourites" element={<FavouriteScreen/>} /> 
      <Route path="/forsale" element={<ForSaleScreen/>} /> 
      <Route path="/distresssale" element={<DistressSaleScreen/>} /> 
      <Route path="/dubaiproperties" element={<DubaiPropertiesScreen/>} /> 
      <Route path="/forRent" element={<ForRentScreen/>} /> 
      <Route path="/sharedapartment" element={<SharedApartmentScreen/>} /> 
      <Route path="/shortLets" element={<ShortLetsScreen/>} /> 
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
