import { BloodStatus } from './bloodStatus';
import { Gender } from './gender';
import { House } from './house';

export interface Character {
  id: string;
  type: string;
  attributes: {
    slug: string;
    alias_names: string[];
    animagus: string | null;
    blood_status: BloodStatus;
    boggart: string;
    born: string | null;
    died: string | null;
    eye_color: string | null;
    family_member: string[] | null;
    gender: Gender;
    hair_color: string;
    height: string | null;
    house: House | null;
    image: string;
    jobs: string[];
    marital_status: string;
    name: string;
    nationality: string;
    patronus: string;
    romances: string[];
    skin_color: string;
    species: string;
    titles: string[];
    wands: string[];
    weight: string | null;
    wiki: string;
  };
  links: {
    self: string;
  };
}
