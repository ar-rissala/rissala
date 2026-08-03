import { createArticlePage } from "@/lib/article-page";

const page = createArticlePage("actualites");

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
