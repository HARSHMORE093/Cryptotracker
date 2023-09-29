import React, { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import ReactHtmlParser from"react-html-parser"
import { LinearProgress, makeStyles ,Typography} from "@material-ui/core";
import { CoinInfo } from "../components/CoinInfo";
import useAxios from "../hooks/UseAxios";

const useStyles = makeStyles((theme) => ({
  container: {
    width:"100%",
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "50%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));

export const CoinsPage = () => {
  const { id } = useParams();
  const { response } = useAxios(`coins/${id}`);
  const { currency, symbol } = CryptoState();

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const classes = useStyles();

  if (!response) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
    <>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <img
            src={response?.image.large}
            alt="response?.name"
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3" className={classes.heading}>
            {response?.name}
          </Typography>
          <Typography variant="subtitle1" className={classes.description}>
            {ReactHtmlParser(response?.description.en.split(". ")[0])}.
          </Typography>

          <div className={classes.marketData}>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {numberWithCommas(response?.market_cap_rank)}
              </Typography>
            </span>

            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}{" "}
                {numberWithCommas(
                  response?.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </span>

            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}{" "}
                {numberWithCommas(
                  response?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
                M
              </Typography>
            </span>

          </div>
        </div>
        <div className={classes.container}><CoinInfo/></div>
      </div>
    </>
  );
};
