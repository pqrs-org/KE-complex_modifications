import { CategoryObject } from "../types";
import { KarabinerJsonFile } from "./KarabinerJsonFile";

export class Category {
  readonly object: CategoryObject;
  readonly files: KarabinerJsonFile[] = [];

  constructor(object: CategoryObject) {
    this.object = object;

    if (object.files !== undefined) {
      this.files = object.files.map((f) => new KarabinerJsonFile(f));
    }
  }
}
