import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { styled } from "styled-components";
import Cloud from "../src/clouds.png";
import { TbWind, TbSearch } from "react-icons/tb";
import { MdWaves } from "react-icons/md";
import { BiLoaderCircle } from "react-icons/bi";

function App() {
  const [data, setData] = useState({});
  const [city, setCity] = useState("");
  const [error, setError] = useState();
  const [load, setLoad] = useState(false);
  const { current, location } = data;
  console.log(error);
  function DataWeather() {
    setLoad(true);
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=a9ef8b3ef503416c8eb02039230608&q=${city}&aqi=no`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      )
      .then((response) => {
        setData(response.data);
        setLoad(false);
        if (response.status === 400) {
          setError("No matching location found");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoad(false);
        setError("No matching location found");

        // setError(error.data.error.message);
      });
  }
  return (
    <AppCont>
      <div className="form">
        <input
          type="text"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          placeholder="Enter city name"
        />
        <button onClick={() => DataWeather()}>
          <TbSearch />
        </button>
      </div>

      <section>
        {load ? (
          <div
            style={{
              margin: "140px auto",
            }}
          >
            <BiLoaderCircle size={60} />
          </div>
        ) : !current ? (
          <div
            style={{
              margin: "140px auto",
            }}
          >
            <p>Search any city by name</p>
          </div>
        ) : error ? (
          <div
            style={{
              margin: "140px auto",
            }}
          >
            <p style={{ color: "#fff" }}>{error}</p>
          </div>
        ) : (
          <div>
            <img src={Cloud} width={"50%"} />
            <p className="temp">
              {current?.temp_c} <sup>O</sup>C{" "}
            </p>
            <p className="city">{city}</p>
            <div className="flex">
              <p className="region" style={{ float: "left" }}>
                Country:{location?.country}
              </p>
              <p className="region" style={{ float: "right" }}>
                {location.region && `Region:${location?.region} `}
              </p>
            </div>

            <div className="flex">
              <div className="flex">
                <div>
                  <MdWaves size={45} />
                </div>
                <div>
                  <p>{current?.humidity} %</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="flex">
                <div>
                  {" "}
                  <TbWind size={45} />
                </div>
                <div>
                  <p>{current?.wind_kph} km/h</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </AppCont>
  );
}

export default App;

const AppCont = styled.div`
  background: #383cc1;
  width: 360px;
  border-radius: 10px;
  margin: 100px auto;
  height: auto;
  padding: 20px;
  text-align: center;
  box-shadow: 1px 1px 2px 1px #cad5e2;
  border: none;
  .form {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  input {
    padding: 10px;
    width: 160px;
    font-size: medium;
    border-radius: 100px;
    border: none;
  }
  button {
    padding: 11px;
    font-size: large;
    border-radius: 100px;
    border: none;
    display: flex;
    align-items: center;
    margin: 5px;
    cursor: pointer;
  }
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-around;
    div {
      margin: 5px;
    }
  }

  p {
    line-height: 4px;
  }
  .temp {
    font-size: 1.4rem;
    sup {
      font-size: small;
    }
  }
  .city_div {
    position: relative;
    top: 0;
    bottom: 0;
    background: red;
    height: 50px;
    width: 200px;
  }
  .country {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .city {
    font-size: 2.3rem;
  }
  @media screen and (max-width: 430px) {
    width: 80%;
    .flex {
      flex-wrap: wrap;
      font-size: 0.9rem;
    }
  }
`;
