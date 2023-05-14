import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from "react";
import { CoinList } from './config/api';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const  [user,setUser]=useState(null);
  const [alert,setAlert]=useState({
    open:false,
    message:'',
    type:'success'
  });
  const [watchlist, setWatchlist]=useState([]);
  const [myFav, setmyFav] = useState(false);

  useEffect(()=>{
    if(user){
      console.log("user changed to ");
      setAlert({
        open: true,
        message: `User changed to ${user}`,
        type: "error",
    });
    console.log("for watchlist");
    console.log(user);
    fetch("http://localhost:5000/getwatchlist", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email:user,
      }),      
    })
      .then((res) => res.json())
      .then((data) => {
          if(data.watchlist){
          setWatchlist(data.watchlist);
          }
          else
          {
            console.log("nothing in watchlist");
          }
      })

    }
  },[user]);  


  // useEffect(()=>{
  //   if(user){
  //     const coinRef=doc(db,'watchlist', user.uid);
  //   var unsubscribe=  onSnapshot(coinRef,coin=>{
  //       if(coin.exists()){
  //         setWatchlist(coin.data().coins);
  //       }else{
  //         console.log('nothis in watch list');
  //       }
  //     }
  //     );
  //     return ()=>{
  //       unsubscribe();
  //     }
  //   }
  // },[user]);

  // useEffect(()=>{
  //   onAuthStateChanged(auth,(user)=>{
  //     if(user)setUser(user);
  //     else setUser(null);
  //   });
  // },[]);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol,coins,loading,fetchCoins, alert,setAlert,user, setUser,watchlist, setWatchlist, myFav, setmyFav}}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};