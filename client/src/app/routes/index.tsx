import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Footer from '../../components/footer';

//Landing Page
import { LandingSkeleton } from '../../features/tierlist';
const TierListPage = lazy(() => import('../../features/tierlist'));

export const router: ReturnType<typeof createBrowserRouter> = 
createBrowserRouter([
    {
        path: '/',
        element: 
        <Suspense fallback={<LandingSkeleton />}>
            <TierListPage />
            <Footer />
        </Suspense>,
    }
]);