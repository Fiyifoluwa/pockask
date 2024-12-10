import Close from './close.svg';
import Search from './search.svg';
import Plus from './plus.svg';
import Warning from './warning.svg';
import PlusOne from './plus-one.svg';
import MinusOne from './minus-one.svg';
import Bookmark from './bookmark.svg';
import CartIcon from './cart.svg';
import FilterIcon from './filter.svg';
import Back from './go-back.svg';
import Heart from './heart.svg';
import HeartFilled from './heart-filled.svg';
import Sort from './sort.svg';
import Star from './star.svg';
import Trash from './trash.svg';

const svgIconPack = {
  Close,
  Search,
  Plus,
  Warning,
  PlusOne,
  MinusOne,
  Bookmark,
  CartIcon,
  FilterIcon,
  Back,
  Heart,
  HeartFilled,
  Sort,
  Star,
  Trash,
};

export {svgIconPack};
export type SvgIconPackType = keyof typeof svgIconPack;
