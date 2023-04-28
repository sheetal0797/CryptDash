import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

// import StarBorderIcon from "@material-ui/icons/StarBorder";
// import StarIcon from "@material-ui/icons/Star";
// import DeleteIcon from "@material-ui/icons/Delete";
// import Icon from "@material-ui/core/Icon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Button} from "@material-ui/core";
import {CSVLink} from 'react-csv';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const headers =[
  {
    label:"Id", key: "id"
  },
  {
    label: "name", key:"name"
  },
  {
    label:"price_change_percentage_24h",key:"price_change_percentage_24h"
  },
  {
    label:"market_cap_change_percentage_24h",key:"market_cap_change_percentage_24h"
  },
  {
    label:"market_cap_rank",key:"market_cap_rank"
  },
  {
    label:"price_change_percentage_24h",key:"price_change_percentage_24h"
  },
  {
    label:"total_supply",key:"total_supply"
  },
  {
    label:"total_volume",key:"total_volume"
  },
  {
    label:"high_24h",key:"high_24h"
  },
  {
    label:"low_24h",key:"low_24h"
  },

]

let favlist = [];
let csvLink={
  filename:"file.csv",
  headers:headers,
  data: favlist
}

export default function CoinsTable() {
  
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol,coins,loading ,fetchCoins, watchlist, setWatchlist, user, setAlert, myFav, setmyFav} = CryptoState();

  const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
  });

  const classes = useStyles();
  const history = useHistory();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  
  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, myFav]);




  const setmyFavorite = async () => {
    // setWatchlist(watchlist);
    console.log("setmyFav");
    console.log(myFav);
    if(myFav){
      setmyFav(false);
    }
    else{
    setmyFav(true);
    }

  };

  const handleSearch = () => {
    console.log("handleSearch");
    console.log(myFav);
    if(!myFav)
    {
    
      favlist = coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      );
      csvLink={
        filename:"AllCoins.csv",
        headers:headers,
        data: favlist
      }
      return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
    }

    favlist = coins.filter(
      (coin) => watchlist.includes(coin.id.toLowerCase())
    );
    csvLink={
      filename:"FavCoins.csv",
      headers:headers,
      data: favlist
    }
    return coins.filter(
      (coin) => watchlist.includes(coin.id.toLowerCase())
    );;
  };

  // const handleFavorite = () => {

  //   return coins.filter(
  //     (coin) => watchlist.includes(coin.id.toLowerCase())
  //   );
  // };

  // const showTable = () => {
  //   if(!myFav)
  //   {
  //     return handleSearch();
  //   }
  //   else
  //   {
  //     return handleFavorite();
  //   }
  // }

  async function handleCheckboxClick(e, coin)
  {
    console.log(e.target.checked);

    if(!e.target.checked) {
      const newWatchlist = watchlist.filter((wish) => wish !== coin?.id)
      console.log(newWatchlist);
  
      fetch("http://localhost:5000/setwatchlist", {
        method:"POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: user,
          newwatchlist: newWatchlist,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setAlert({
            open: true,
            message: `${coin.name} Removed from the Watchlist !`,
            type: "success",
          });
          })
  
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
    else {
      const newWatchlist = watchlist ? [...watchlist, coin?.id] : [coin?.id];

      console.log(newWatchlist);
  
      fetch("http://localhost:5000/setwatchlist", {
        method:"POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: user,
          newwatchlist: newWatchlist,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setAlert({
            open: true,
            message: `${coin.name} Added to the Watchlist !`,
            type: "success",
          });
        })
  
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

    e.stopPropagation();

  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        {/* <Button
          onClick={myFav = true}
        >
          My Watchlist
        </Button> */}
        <CSVLink  {...csvLink}> Download </CSVLink>

        <Button
            variant='outlined'
            style={{
              width:'100%',
              height:40,
              backgroundColor:myFav?'#ff0000':'#EEBC1D',
            }}
            onClick={setmyFavorite}
            >
               {myFav ? "Show All Coins" : "Show My Watchlist"}
        </Button>



        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Favourites", "Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                  {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    const isFavorite = watchlist.includes(row.id);

                    return (
                      <TableRow
                        onClick={() => history.push(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell>
                          <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} name="checkedH" 
                          checked={isFavorite}
                          onClick={(e) => handleCheckboxClick(e, row)}/>
                        </TableCell>

                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        {/* Comes from @material-ui/lab */}
        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}