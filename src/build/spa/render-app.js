import renderPage from "./render-page.js";
const renderApp = () => {
    const links = document.querySelectorAll(".proxy-route");
    links.forEach((item, index) => {
        item.addEventListener("click", () => {
            switch (index) {
                case 0:
                    renderPage("/");
                    break;
                case 1:
                    renderPage("/products");
                    break;
                case 2:
                    renderPage("/categories");
                    break;
                case 3:
                    renderPage("/history");
                    break;
                default:
                    renderPage("/");
                    break;
            }
        });
    });
    renderPage("/");
};
export default renderApp;
