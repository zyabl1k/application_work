import { Outlet } from 'react-router';
import { HeaderWidget } from './header/header.widget.jsx';

export const IndexLayout = () => {
  return (
    <>
      <HeaderWidget />
      <div className="pl-3 pr-3">
        <Outlet />
      </div>
    </>
  );
};
