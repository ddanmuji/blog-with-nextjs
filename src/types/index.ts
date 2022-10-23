export type Article = {
  id: string;
  title: string;
  content: string;
  date: string;
};

export type CreateArticleBody = Omit<Article, 'date'>;

export type ArticleList = Article[];

export type Theme = 'light' | 'dark';
