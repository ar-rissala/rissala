import { createArticlePage } from "@/lib/article-page";

const page = createArticlePage("sciences-islamiques");

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
