
import backgroundImage from "./background.image";

function backgroundStyles(contentItem, label = "1:1") {
  return {
    backgroundImage: `url('${backgroundImage(contentItem, { label })}')`,
  };
}

export default backgroundStyles;
