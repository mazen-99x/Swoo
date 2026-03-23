import HeadIcons from "../HeaderComponents/HeadIcons";
import SearchBox from "../HeaderComponents/SearchBox";

function TopHeader() {
  return (
    <div className="topHeader max-md:hidden py-2  bg-(--white-color) dark:bg-(--dark-alt-color)">
      <div className="container  flex justify-between items-center">
        <div>
          <img
            src="/assets/logo.png"
            alt="logo"
            className="w-18 rounded-full"
          />
        </div>
        <SearchBox id={"BigSearch"} />
        <HeadIcons />
      </div>
    </div>
  );
}

export default TopHeader;
