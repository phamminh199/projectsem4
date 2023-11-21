import axios from "axios";

// http://localhost:49066/api/showroom/GetAllCars
const instance = axios.create({
   baseURL: 'http://localhost:9999/api',
   headers: {},
   // headers: {'Access-Control-Allow-Origin': '*'},
});

//quản lý những cái lỗi axios
instance.interceptors.response.use(
   (res) => res, //nếu có res thì trả ra res
   (err) => err //nếu có lỗi thì trả ra lỗi
)

export default instance;

/*
   Creating an instance link docs: https://axios-http.com/docs/instance

   You can create a new instance of axios with a custom config.

   axios.create([config])

   const instance = axios.create({
   baseURL: 'https://some-domain.com/api/',
   timeout: 1000,
   headers: {'X-Custom-Header': 'foobar'}
   });
   Instance methods

   The available instance methods are listed below. The specified config will be merged with the instance config.

   axios#request(config)

   axios#get(url[, config])

   axios#delete(url[, config])

   axios#head(url[, config])

   axios#options(url[, config])

   axios#post(url[, data[, config]])

   axios#put(url[, data[, config]])

   axios#patch(url[, data[, config]])

   axios#getUri([config])
*/