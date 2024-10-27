import React from "react";
import { TitleScreen } from "./Pages/TitleScreen.tsx";
import { About } from "./Pages/About.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar/Navbar.tsx";
import { ItemDisplay } from "./Pages/ItemDisplay.tsx";
import { ItemType } from "./Pages/ItemDisplay.tsx";
import { Provider } from "react-redux";
import { appStore } from "./Stores/appStore.tsx";
function App() {
  return (
    <>
      <Provider store={appStore}>
        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<TitleScreen></TitleScreen>} />
            <Route path="/About" element={<About></About>} />
            <Route
              path="/Games"
              element={<ItemDisplay itemType={ItemType.GAMES}></ItemDisplay>}
            />
            <Route
              path="/Books"
              element={<ItemDisplay itemType={ItemType.BOOKS}></ItemDisplay>}
            />
            <Route
              path="/Movies"
              element={<ItemDisplay itemType={ItemType.MOVIES}></ItemDisplay>}
            />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
