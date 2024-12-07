import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Pages/Layout";
import Swap from "./Pages/Swap";
import Pool from "./Pages/Pool";
import { MetaMaskProvider } from "./context/MetamaskContext";
import AddLiquidity from "./Pages/AddLiquidity";
import { SwapProvider } from "./context/SwapContext";
import { SwapCode } from "./SwapScripts/SwapCode";
import Loader from "./Components/Common/Loader";
import { CommonProvider } from "./context/CommonContext";
import { SearchTokenData } from "./SwapScripts/SearchTokenData";
import Home from "./Pages/Home/Home";

function App() {
  console.log("... test");
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/swap",
          element: <Swap />,
        },
        {
          path: "/pool",
          element: <Pool />,
        },
        {
          path: "/add/v2",
          element: <AddLiquidity />,
        },
      ],
    },
  ]);

  return (
    <CommonProvider>
      <MetaMaskProvider>
        <SwapProvider>
          <RouterProvider router={router} />
          <Loader />
        </SwapProvider>
      </MetaMaskProvider>
    </CommonProvider>
  );
}

export default App;
