import { router } from './routes';
import { RouterProvider } from 'react-router-dom';

const AppRouter = () => {
  return <RouterProvider router={router} />;
}

function App() {
  return (
    <AppRouter/ >
  );
}

export default App
