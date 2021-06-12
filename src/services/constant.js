export const BASE_URL = "https://vcare4u-springboot.herokuapp.com";
// export const LOCAL_URL = "http://localhost:3000";
export const LOCAL_URL = "https://vcare4u-uoh.herokuapp.com";
export const SECRET_KEY = "Choumiyan";
function importAll(r) {
  return r.keys().map(r);
}

export const images = importAll(
  require.context("./../images/Carousel/", false, /\.(png|jpe?g|svg)$/)
);
