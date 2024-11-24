import { Light } from './light';
import { SpellCategory } from './spellCategory';

export interface Spell {
  id: string;
  type: string;
  attributes: {
    slug: string;
    category: SpellCategory;
    creator: string | null;
    effect: string;
    hand: string | null;
    image: string;
    incantation: string | null;
    light: Light;
    name: string;
    wiki: string;
  };
  links: {
    self: string;
  };
}
