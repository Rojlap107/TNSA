import NewsList from "../../components/NewsList";
import { getAllNews } from "../../lib/getNews";

export const metadata = {
  title: "News - Tibetan National Sports Association",
};

export default async function NewsPage() {
  const allNews = await getAllNews();
  // Strip 'source' field before sending to client component
  const items = allNews.map(({ id, title, image, date, author, content }) => ({
    id,
    title,
    image,
    date,
    author,
    content,
  }));

  return <NewsList items={items} />;
}
