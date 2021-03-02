import React from "react";
import MainScreen from "./components/MainScreen";

import Sidebar from "./components/Sidebar";

const App: React.FC = () => (
  <div className="min-h-screen flex bg-gray-100">
    <Sidebar />
    <MainScreen title="Top 100 des albums disponible sur iTunes" />
  </div>
);

export default App;
