export const NEWS_LIST = `*[_type=="news"]|order(date desc){
  "id": slug.current,
  title,
  "image": coalesce(coverImage.asset->url, ""),
  date,
  author,
  "excerpt": coalesce(pt::text(content[0]), "")
}`;

export const NEWS_ONE = `*[_type=="news" && slug.current==$slug][0]{
  "id": slug.current,
  title,
  "image": coalesce(coverImage.asset->url, ""),
  date,
  author,
  content
}`;
