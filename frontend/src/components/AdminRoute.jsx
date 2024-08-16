// import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// // import { createSelector } from 'reselect';

// const selectLoginState = (state) => state.login;

// const selectUserInfo = createSelector(
//   [selectLoginState],
//   (login) => login.userInfo
// );

// const AdminRoute = () => {
//   const userInfo = useSelector(selectUserInfo);

//   return userInfo && userInfo.isAdmin ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

// export default AdminRoute;



import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute= () => {
    const { userInfo } = useSelector((state) => state.auth);
    return userInfo && userInfo.isAdmin ?(
    <Outlet /> 
    ) : (
    <Navigate to="/login" replace/>
);
};

export default AdminRoute;