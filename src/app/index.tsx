import RouterProvider from "./providers/router";
import StoreProvider from "./providers/store";

const App = () => {
  return (
    <StoreProvider>
      <RouterProvider />
    </StoreProvider>
  );
};

export default App;
