import React from "react";
import { TitleScreen } from "./Pages/TitleScreen.tsx";
import { About } from "./Pages/About.tsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Navbar } from "./Components/Navbar/Navbar.tsx";
import { ItemDisplay } from "./Pages/ItemDisplay.tsx";
import { ItemType } from "./Pages/ItemDisplay.tsx";

import useAuth from "./Hooks/useAuth";
function App() {
  const isAuthenticated = useAuth();
  return (
    <Router>
      {isAuthenticated && <Navbar></Navbar>}
      <Routes>
        <Route exact path="/" element={<TitleScreen></TitleScreen>} />
        {isAuthenticated && (
          <>
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
          </>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
