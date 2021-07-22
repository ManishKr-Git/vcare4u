export const BASE_URL = "https://vcare4u-springboot.herokuapp.com";
// export const BASE_URL = "http://localhost:8080";
// export const LOCAL_URL = "http://localhost:3000";
export const LOCAL_URL = "http://vcare4u-uoh.herokuapp.com";
function importAll(r) {
  return r.keys().map(r);
}

export const images = importAll(
  require.context("./../images/Carousel/", false, /\.(png|jpe?g|svg)$/)
);
