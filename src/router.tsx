import { createBrowserRouter } from 'react-router-dom';
import { ProjectListPage } from './pages/ProjectListPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';

export const router = createBrowserRouter([
  { path: '/', element: <ProjectListPage /> },
  { path: '/projects/:projectId', element: <ProjectDetailPage /> },
]);
