import { Suspense, lazy} from 'react';
import { Skeleton } from "../components/ui/skeleton";
import TierListPage from '../features/tierlist/index';
import { Routes, Route } from "react-router-dom";

//const TierList = lazy(() => import('../features/tierlist/index'));

function App() {
  return (
    /*<Suspense fallback={<LandingSkeleton />}>
      <TierList />
    </Suspense>*/
    <Routes>
      <Route path='/'
        element={<TierListPage />}
      >
      </Route>
    </Routes>
  );
}

function LandingSkeleton() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <p className="text-xl mb-5">
        Loading...
      </p>
      <div>
        <Skeleton className="w-[250px] h-[125px] rounded-xl mb-5" />
        <Skeleton className="w-[250px] h-4" />
      </div>
    </div>
  );
}

export default App
