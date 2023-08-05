import { Search } from "../lib/component/Search";
import { getRandomPhoto } from "../lib/unsplash";

const Home = async () => {
  const randomPhotos = await getRandomPhoto();
  return (
    <div>
      <Search randomPhotos={randomPhotos} />
    </div>
  );
};

export default Home;
