import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    (async function () {
      // The code must run in a browser environment and not in node environment
      if (window && window.ethereum) {
        // User has a injected wallet

        if (window.ethereum.isMinipay) {
          // User is using Minipay

          // Requesting account addresses
          let accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
            params: [],
          });

          // Injected wallets inject all available addresses,
          // to comply with API Minipay injects one address but in the form of array
          console.log(accounts[0]);
        }

        // User is not using MiniPay
      }

      // User does not have a injected wallet
    })();

    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="h1">
        There you go... a canvas for your next Celo project!
      </div>
      {isConnected ? (
        <div className="h2 text-center">Your address: {userAddress}</div>
      ) : (
        <div>No Wallet Connected</div>
      )}
    </div>
  );
}
