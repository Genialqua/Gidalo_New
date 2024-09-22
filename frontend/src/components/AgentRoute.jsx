import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AgentRoute= () => {
    const { userInfo } = useSelector((state) => state.auth);
    return userInfo && userInfo.isAgent ?(
    <Outlet /> 
    ) : (
    <Navigate to="/login" replace/>
);
};

export default AgentRoute;