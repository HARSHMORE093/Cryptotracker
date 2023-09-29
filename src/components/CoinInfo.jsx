import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
import { Line } from "react-chartjs-2";
import {
  Button,
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { CryptoState } from "../CryptoContext";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/UseAxios";
import moment from "moment";


const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));

export const CoinInfo = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { currency } = CryptoState();
  const { response } = useAxios(
    `coins/${id}/market_chart?vs_currency=${currency}&days=${10}`
  );

  if (!response) {
    return (
      <div className={classes.container}>
        <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
      </div>
    );
  }

  const coinChartData = response?.prices.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));
  const data = {
    labels: coinChartData.map((value) => moment(value.x).format("MMM DD")),
    datasets: [
      {
        fill: true,
        label: id,
        data: coinChartData.map((val) => val.y),
        borderColor: "#EEBC1D",
      },
    ],
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
};
