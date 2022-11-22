import { homePageTitlesProps } from "../Interfaces/homePageTitle";
import "./HomePageTitles.css";
const HomePageTitles: React.FC<homePageTitlesProps> = ({
  mainTitle,
  subTitle,
  thirdTitle,
}) => {
  return (
    <div className="home-page-title">
      <h1>{mainTitle}!</h1>
      <h3>{subTitle}</h3>
      {thirdTitle&&<h3>{thirdTitle}</h3>}
    </div>
  );
};
export default HomePageTitles;
