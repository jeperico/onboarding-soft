import { renderContent } from "../../proxy.js";

const loadSPA = () => {
  const links = document.querySelectorAll(".proxy-route");

  links.forEach((item, index) => {
    item.addEventListener("click", () => {
      switch (index) {
        case 0:
          renderContent("/");
          break;
        case 1:
          renderContent("/products");
          break;
        case 2:
          renderContent("/categories");
          break;
        case 3:
          renderContent("/history");
          break;
        default:
          renderContent("/");
          break;
      }
    });
  });

  renderContent("/");
};

export default loadSPA;
