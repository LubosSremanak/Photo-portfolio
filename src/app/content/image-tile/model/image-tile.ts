export interface ImageTile {
  id: number;
  about: string;
  title: string;
  imageUrl: string;
  rootImage: string;
  format: string;
  articlePath: string;
  order: number[];
  linkedArticles: string[];
}
