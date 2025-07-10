import { Outlet } from 'react-router-dom';
import Header from '../header/Header';

const Layout = () => {
  return (
    <div className="w-[90%] m-auto">
      <Header />
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
