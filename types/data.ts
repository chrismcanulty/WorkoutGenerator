export interface SequenceItem {
  author_history: Array<string>;
  category: number;
  creation_date: string;
  description: string;
  equipment: Array<number>;
  exercise_base: number;
  id: number;
  language: number;
  license: number;
  license_author: string;
  muscles: Array<number>;
  muscles_secondary: Array<number>;
  name: string;
  uuid: string;
  variations: Array<number>;
}

export interface MuscleItem {
  id: number;
  name: string;
  name_en: string;
  is_front: boolean;
  image_url_main: string;
  image_url_secondary: string;
}
