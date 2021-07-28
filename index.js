import { createServer } from "http";
import { config } from "dotenv";
import axios from "axios";

config();
const weather_key = process.env.WEATHER_API_KEY;
const news_key = process.env.NEWS_API_KEY;

const server = createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
            
  const getWeatherData = async (city) => {
    var API =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      weather_key;

    const { data } = await axios.get(API);

    res.end(JSON.stringify(data));
  };

  const getForecastData = async () => {
    var API =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      weather_key;

    var { data } = await axios.get(API);
    
    let forecastAPI="https://api.openweathermap.org/data/2.5/onecall?lat=" +data.coord.lat +"&lon=" +data.coord.lon +"&exclude=current, minutely, hourly" +"&appid=" +weather_key +"&units=metric";

    var { data } = await axios.get(forecastAPI);
    res.end(JSON.stringify(data));
  };

  const getNewsData = async () => {
    var API =
      "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=climate&pageNumber=1&pageSize=10&autoCorrect=true&fromPublishedDate=null&toPublishedDate=null";

    var headers = {
      "x-rapidapi-key": news_key,
      "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
    };

    const { data } = await axios.get(API, { headers: headers });
    res.end(JSON.stringify(data));
  };

  var baseUrl = new URL("https://" + req.headers.host + req.url);
  console.log(baseUrl);
  var city = baseUrl.searchParams.get("q");
  if (baseUrl.pathname === "/weather") {
    console.log("Weather");
    getWeatherData(city);
  }
  if (baseUrl.pathname === "/news") {
    console.log("news");
    getNewsData();
  }
  if (baseUrl.pathname === "/forecast") {
    console.log("Forecast");
    getForecastData()
  }
});

const PORT = process.env.PORT || 8000;
console.log(PORT);
server.listen(PORT, () => {
  console.log(`Server is live at port ${PORT}`);
});
