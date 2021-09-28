import {Image} from "../../../api/article/model/image";

export interface ImageTile {
  about: string;
  title: string;
  articlePath: string;
  image: Image;
}
