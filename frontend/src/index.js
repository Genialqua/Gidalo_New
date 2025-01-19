// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/bootstrap.custom.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminRoute from './components/AdminRoute';
import AgentRoute from './components/AgentRoute';
import HomeScreen from './screens/HomeScreen';
import PropertyScreen from './screens/PropertyScreen';
import FavouriteScreen from './screens/favouritesScreen';
import ForSaleScreen from './screens/forSale.jsx';
import DistressSaleScreen from './screens/distressSale.jsx';
import DubaiPropertiesScreen from './screens/DubaiProperties.jsx';
import ForRentScreen from './screens/forRent.jsx';
import LandsScreen from './screens/LandsScreen.jsx';
import SharedApartmentScreen from './screens/sharedApartment.jsx';
import ShortLetsScreen from './screens/shortLets.jsx';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen.jsx';
import PropertyListScreen from './screens/admin/PropertyListScreen.jsx';
import PropertyEditScreen from './screens/admin/PropertyEditScreen';
import AgentPropertyListScreen from './screens/agent/AgentPropertyListScreen.jsx';
import AgentPropertyEditScreen from './screens/agent/AgentPropertyEditScreen.jsx';
import UserListScreen from './screens/admin/UserListScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import UserEditScreen from './screens/admin/UserEditScreen';
import ShortletBookingScreen from './screens/ShortletBookingScreen.jsx';
import WarehouseScreen from './screens/WarehouseScreen.jsx';
import BoysQuartersScreen from './screens/BoysQuartersScreen.jsx';
import HomeMoversScreen from './screens/HomeMoversScreen.jsx';
import LandingPage from './screens/LandingPage.jsx';
import store from './store';
import { Provider } from 'react-redux';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<LandingPage />} />

        <Route path="/home" element={<HomeScreen />} />
        <Route path="/search/:keyword" element={<HomeScreen />} />
        <Route path="/page/:pageNumber" element={<HomeScreen />} />
        <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
        <Route path="/property/:id" element={<PropertyScreen />} />
        <Route path="/favourites" element={<FavouriteScreen />} />
        <Route path="/forsale" element={<ForSaleScreen />} />
        <Route path="/distresssale" element={<DistressSaleScreen />} />
        <Route path="/lands" element={<LandsScreen />} />
        <Route path="/boysQuarters" element={<BoysQuartersScreen />} />
        <Route path="/warehouses" element={<WarehouseScreen />} />
        <Route path="/homemovers" element={<HomeMoversScreen />} />
        <Route path="/dubaiproperties" element={<DubaiPropertiesScreen />} />
        <Route path="/forRent" element={<ForRentScreen />} />
        <Route path="/sharedapartment" element={<SharedApartmentScreen />} />
        <Route path="/shortLets" element={<ShortLetsScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/shortletbooking" element={<ShortletBookingScreen />} />
        </Route>

        <Route path="" element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<h1>Admin Dashboard</h1>} />
          <Route path="/admin/properties" element={<h1>Admin Properties</h1>} />
          <Route path="/admin/users" element={<h1>Admin Users</h1>} />
          <Route path="/admin/propertylist" element={<PropertyListScreen />} />
          <Route path="/admin/property/:id/edit" element={<PropertyEditScreen />} />
          <Route path="/admin/propertylist/:pageNumber" element={<PropertyListScreen />} />
          <Route path="/admin/userlist" element={<UserListScreen />} />
          <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
        </Route>

        <Route path="" element={<AgentRoute />}>
          <Route path="/agent/dashboard" element={<h1>Agent Dashboard</h1>} />
          <Route path="/agent/properties" element={<h1>Agent Properties</h1>} />
          <Route path="/agent/propertylist" element={<AgentPropertyListScreen />} />
          <Route path="/agent/property/:id/edit" element={<AgentPropertyEditScreen />} />
          <Route path="/agent/propertylist/:pageNumber" element={<AgentPropertyListScreen />} />
          <Route path="/agent/propertieslist" element={<AgentPropertyListScreen />} />
          <Route path="/agent/user/:id/edit" element={<UserEditScreen />} />
        </Route>
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Route>
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();




// // src/index.js
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './assets/styles/bootstrap.custom.css';
// //import './assets/styles/index.css';
// //import 'bootstrap/dist/css/bootstrap.min.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import './index.css';
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider
// } from 'react-router-dom';
// import { HelmetProvider } from 'react-helmet-async';
// import PrivateRoute from './components/PrivateRoute.jsx';
// import AdminRoute from './components/AdminRoute';
// import AgentRoute from './components/AgentRoute';
// import HomeScreen from './screens/HomeScreen';
// import PropertyScreen from './screens/PropertyScreen';
// import FavouriteScreen from './screens/favouritesScreen';
// import ForSaleScreen from './screens/forSale.jsx';
// import DistressSaleScreen from './screens/distressSale.jsx';
// import DubaiPropertiesScreen from './screens/DubaiProperties.jsx';
// import ForRentScreen from './screens/forRent.jsx';
// import LandsScreen from './screens/LandsScreen.jsx';
// import SharedApartmentScreen from './screens/sharedApartment.jsx';
// import ShortLetsScreen from './screens/shortLets.jsx';
// import LoginScreen from './screens/LoginScreen';
// import RegisterScreen from './screens/RegisterScreen.jsx';
// import PropertyListScreen from './screens/admin/PropertyListScreen.jsx';
// import PropertyEditScreen from './screens/admin/PropertyEditScreen';
// import AgentPropertyListScreen from './screens/agent/AgentPropertyListScreen.jsx';
// import AgentPropertyEditScreen from './screens/agent/AgentPropertyEditScreen.jsx';
// import UserListScreen from './screens/admin/UserListScreen.jsx';
// import ProfileScreen from './screens/ProfileScreen.jsx';
// import UserEditScreen from './screens/admin/UserEditScreen'
// import ShortletBookingScreen from './screens/ShortletBookingScreen.jsx';
// import WarehouseScreen from './screens/WarehouseScreen.jsx';
// import BoysQuartersScreen from './screens/BoysQuartersScreen.jsx';
// import HomeMoversScreen from './screens/HomeMoversScreen.jsx';
// import store from './store';
// import { Provider } from 'react-redux';




// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//     <Route path="/" element={<App />}>
//       <Route index={true} path='/' element={<HomeScreen />} />
//       { <Route path='/search/:keyword' element={<HomeScreen />} /> }
//       <Route path="/page/:pageNumber" element={<HomeScreen />} />
    
//        <Route
//         path='/search/:keyword/page/:pageNumber'
//         element={<HomeScreen />}
//       /> 
//       <Route path="property/:id" element={<PropertyScreen />} />
//       <Route path="favourites" element={<FavouriteScreen />} />
//       <Route path="forsale" element={<ForSaleScreen />} />
//       <Route path="distresssale" element={<DistressSaleScreen />} />
//       <Route path="lands" element={<LandsScreen />} />
//       <Route path="boysQuarters" element={<BoysQuartersScreen />} />
//       <Route path="warehouses" element={<WarehouseScreen />} />
//       <Route path="homemovers" element={<HomeMoversScreen />} />
//       <Route path="dubaiproperties" element={<DubaiPropertiesScreen />} />
//       <Route path="forRent" element={<ForRentScreen />} />
//       <Route path="sharedapartment" element={<SharedApartmentScreen />} />
//       <Route path="shortLets" element={<ShortLetsScreen />} />
//       <Route path="login" element={<LoginScreen />} />
//       <Route path="register" element={<RegisterScreen />} />
      

//       <Route path='' element={<PrivateRoute/>}>
//       <Route path='/profile' element={<ProfileScreen />} />
//       <Route path='shortletbooking' element={<ShortletBookingScreen />} />
    
//       </Route>
      
//     </Route>

    
//     <Route path='' element={<AdminRoute />}>
      
//       <Route path='admin/dashboard' element={<h1>Admin Dashboard</h1>} />
//       <Route path='admin/properties' element={<h1>Admin Properties</h1>} />
//       <Route path='admin/users' element={<h1>Admin Users</h1>} />
//       <Route path='admin/propertylist' element={<PropertyListScreen />} />
//       <Route path='/admin/property/:id/edit' element={<PropertyEditScreen />} />
//       <Route
//           path='/admin/propertylist/:pageNumber'
//           element={<PropertyListScreen />}
//         />
//        <Route path='/admin/userlist' element={<UserListScreen />} />
       
//        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
//     </Route>

//     <Route path='' element={<AgentRoute />}>
      
//       <Route path='agent/dashboard' element={<h1>Agent Dashboard</h1>} />
//       <Route path='agent/properties' element={<h1>Agent Properties</h1>} />
//       <Route path='agent/users' element={<h1>Agent Users</h1>} />
//       <Route path='agent/propertylist' element={<AgentPropertyListScreen />} />
//       <Route path='/agent/property/:id/edit' element={<AgentPropertyEditScreen />} />
//       <Route
//           path='/agent/propertylist/:pageNumber'
//           element={<AgentPropertyListScreen />}
//         />
//        <Route path='/agent/propertieslist' element={<AgentPropertyListScreen />} />
       
//        <Route path='/agent/user/:id/edit' element={<UserEditScreen />} />
//     </Route>
//    </> 

//   )
// );

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <HelmetProvider>
//     <Provider store={store}>
//       <RouterProvider router={router} />
//     </Provider>
//     </HelmetProvider>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

