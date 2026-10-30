import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout.jsx';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Pricing from '../pages/Pricing.jsx';
import Contact from '../pages/Contact.jsx';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/pricing',
        element: <Pricing />
      },
      {
        path: 'contact',
        element: <Contact />
      },
    ],
  },
  
]);

export default router;
