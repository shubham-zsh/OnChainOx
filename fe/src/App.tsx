import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import Home from "./pages/Home";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { Route, Routes } from "react-router-dom";
import Play from "./pages/Play";

function App() {
  return (
    <div className="min-h-screen bg-black flex justify-center font-mono">
      <div className="w-full max-w-7xl bg-black shadow-sm rounded-2xl px-6 sm:px-8 lg:px-12 xl:px-20 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
