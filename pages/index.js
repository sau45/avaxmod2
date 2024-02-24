import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import securityWalletAbi from "../artifacts/contracts/SecurityManagement.sol/SecurityManagement.json";

export default function HomePage() {
  const [securityWallet, setSecurityWallet] = useState(undefined);
  const [securityAccount, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);

  const userAdd = useRef();
  const userRole = useRef();
  const removeUserAdd = useRef();

  const contractAddress = "0x00C406D49D4822088061E051E9852D3Cb7Fd7b1F";
  const atmABI = securityWalletAbi.abi;

  const getWalletAddress = async () => {
    if (window.ethereum) {
      setSecurityWallet(window.ethereum);
    }

    if (securityWallet) {
      try {
        const accounts = await securityWallet.request({
          method: "eth_accounts",
        });
        accoundHandler(accounts);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const accoundHandler = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No securityAccount found");
    }
  };

  const connectToMetamask = async () => {
    if (!securityWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await securityWallet.request({
      method: "eth_requestAccounts",
    });
    accoundHandler(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(securityWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const registerUser = async () => {
    let address = userAdd.current.value;
    const role = userRole.current.value;
    try {
      if (atm) {
        let tx = await atm.addUser(address, role);
        await tx.wait();
        alert("user registered !");
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG");
      console.log(error);
    }
  };

  const revokeAccess = async () => {
    const userAddress = userAdd.current.value;
    try {
      if (atm) {
        const transaction = await atm.removeUser(userAddress);
        await transaction.wait();
        alert("user removed !");
      }
    } catch (error) {}
  };

  useEffect(() => {
    getWalletAddress();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>security system</h1>
      </header>
      <div className="content">
        {!securityAccount ? (
          <button onClick={connectToMetamask}>Start Security system</button>
        ) : (
          <>
            <div className="div">
              <div className="heading-remove">
                <h2>Add user : </h2>
              </div>
              <div className="btn-group">
                <div>
                  <input ref={userAdd} type="text" placeholder="Address" />
                  <input ref={userRole} type="text" placeholder="role" />
                </div>
                <button onClick={registerUser}>Give User Access</button>
              </div>

              <div className="heading-remove">
                <h2>remove user :</h2>
              </div>
              <div className="remove-area">
                <div>
                  <input
                    ref={removeUserAdd}
                    type="text"
                    placeholder="Address"
                  />
                </div>
                <button onClick={revokeAccess}> Remove user </button>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f4f4f4;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .heading-remove {
          margin-top: 3.1em;
        }

        header {
          margin-bottom: 20px;
          text-align: center;
        }

        h1 {
          font-size: 24px;
          color: #333;
          text-align: center;
        }
        .remove-area {
          display: flex;
          margin-top: 0.6em;
          width: 100%;
          justify-content: space-between;
          align-items: baseline;
        }

        .content {
          width: 100%;
          max-width: 600px;
          background-color: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .div {
          margin-bottom: 20px;
        }
        .btn-group {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        h2 {
          font-size: 18px;
          margin-bottom: 10px;
          color: #333;
        }

        button {
          padding: 9px 21px;
          margin-top: 11px;
          cursor: pointer;
          background-color: #007bef;
          border-radius: 5px;
          font-size: 13px;
          color: #fff;
        }
        input {
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 100%;
          box-sizing: border-box;
        }
      `}</style>
    </main>
  );
}
