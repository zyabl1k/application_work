import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundaryWidget } from '../widgets/error-boundary/error-boundary.widget.jsx';
import { IndexLayout } from '../widgets/index.layout.jsx';

const MainView = lazy(() => import('./main/main.view.jsx'));

const SecondView = lazy(() => import('./second/second.view.jsx'));

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexLayout />}>
        <Route index element={<MainView />} />
        <Route path="/app/:appId" element={<SecondView />} />
        <Route path="*" element={<ErrorBoundaryWidget />} />
      </Route>
    </Routes>
  );
};
