import { pageEnum } from "./enums";

export interface pageContextInterface {
  page: pageEnum;
  setPage: React.Dispatch<React.SetStateAction<pageEnum>>;
}