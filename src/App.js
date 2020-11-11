import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./tailwind.output.css";
import numeral from "numeral";

import LineGraph from "./LineGraph";
import { sortData, prettyPrintStat } from "./util";
import Infobox from "./InfoBox";
import Table from "./Table";
import MapGraph from "./Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(["Worldwide"]);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 35.80746, lng: -80.4796 });
  const [mapZoom, setMapZoom] = useState(4);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          console.log(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="lg:flex lg:justify-evenly lg:flex-row lg:h-screen md:flex-none sm:flex-none h-screen">
      {/* Header - Left Sidebar */}
      <div className="app-left h-screen lg:w-4/5 w-full px-10 flex flex-col">
        <div className="App-header lg:h-24 items-center lg:flex lg:flex-wrap justify-between lg:px-10 lg:py-2 py-10">
          {/* Title */}
          <h1 className="text-red-700 font-semibold text-5xl">Covid Tracker</h1>
          {/* Options */}
          <div className="inline-block">
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              value={country}
              onChange={onCountryChange}
            >
              <option value="WorldWide">WorldWide</option>
              {countries.map((country) => (
                <option key={country.name}>{country.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* InfoBox */}
        <div className="lg:flex lg:h-32 lg:justify-between">
          <Infobox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <Infobox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <Infobox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>

        {/* Map */}
        <div className="h-45 hidden sm:hidden md:visible lg:block">
          <MapGraph
            countries={mapCountries}
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
      </div>

      {/* Right sidebar */}
      <div className="app-right lg:w-2/5 p-6 h-full flex flex-col">
        {/* Table */}
        <h1 className="text-2xl font-semibold pb-4">Top Cases by Country</h1>
        <div className="lg:overflow-scroll">
          <Table countries={tableData} />
        </div>
        <div className="">
          {/* Graph */}
          <LineGraph casesType={casesType} />
        </div>
      </div>
    </div>
  );
}

export default App;
