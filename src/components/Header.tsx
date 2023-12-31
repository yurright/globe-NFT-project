import { FC, Dispatch, SetStateAction, useEffect } from "react";
import { useSDK } from "@metamask/sdk-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  account: string;
  setAccount: Dispatch<SetStateAction<string>>;
}

const Header: FC<HeaderProps> = ({ account, setAccount }) => {
  const { sdk } = useSDK();

  const onClickMetaMask = async () => {
    try {
      const accounts: any = await sdk?.connect();

      setAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(sdk);
  }, [sdk]);

  return (
    <header className="bg-green-100 flex justify-between p-2">
      <div>
        <Link to="/" className="mr-2">
          Home
        </Link>
        <Link to="/my">My</Link>
      </div>
      <div>
        {account ? (
          <div>
            <span>
              {account.substring(0, 7)}...
              {account.substring(account.length - 5)}
            </span>
            <button className="ml-2" onClick={() => setAccount("")}>
              MetaMask Logout
            </button>
          </div>
        ) : (
          <button onClick={onClickMetaMask}>MetaMask Login</button>
        )}
      </div>
    </header>
  );
};

export default Header;
