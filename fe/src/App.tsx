import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import Home from "./pages/Home";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

function App() {
  return (
    <div className="min-h-screen bg-black flex justify-center font-mono">
      <div className="w-full max-w-7xl bg-black shadow-sm rounded-2xl px-6 sm:px-8 lg:px-12 xl:px-20 py-10">
        <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <Home />
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </div>
    </div>
  );
}

export default App;
