import initializePage from "./initialize-page.js";
const initializeApp = () => {
    const links = document.querySelectorAll(".proxy-route");
    links.forEach((item, index) => {
        item.addEventListener("click", () => {
            switch (index) {
                case 0:
                    initializePage("/");
                    break;
                case 1:
                    initializePage("/products");
                    break;
                case 2:
                    initializePage("/categories");
                    break;
                case 3:
                    initializePage("/history");
                    break;
                default:
                    initializePage("/");
                    break;
            }
        });
    });
    initializePage("/");
};
export default initializeApp;
