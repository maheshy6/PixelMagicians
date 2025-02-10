import { Navigate} from 'react-router-dom';
import { ReactElement } from 'react';

interface PrivateRouteProps {
  element: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('users');

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;