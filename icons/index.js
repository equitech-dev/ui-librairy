// Export des icônes React
export { default as BoxIcon } from './BoxIcon.jsx';
export { default as CartIcon } from './CartIcon.jsx';
export { default as ChevronIcon } from './ChevronIcon.jsx';
export { default as EditIcon } from './EditIcon.jsx';
export { default as ExclamationIcon } from './ExclamationIcon.jsx';
export { default as OrderIcon } from './OrderIcon.jsx';
export { default as SearchIcon } from './SearchIcon.jsx';
export { default as SettingsIcon } from './SettingsIcon.jsx';
export { default as ShopBagIcon } from './ShopBagIcon.jsx';
export { default as SquaresIcon } from './SquaresIcon.jsx';
export { default as StatsIcon } from './StatsIcon.jsx';
export { default as TrashIcon } from './TrashIcon.jsx';
export { default as UploadImgIcon } from './UploadImgIcon.jsx';
export { default as UsersIcon } from './UsersIcon.jsx';

// Export par défaut de toutes les icônes
export const icons = {
  box: () => import('./BoxIcon.jsx'),
  cart: () => import('./CartIcon.jsx'),
  chevron: () => import('./ChevronIcon.jsx'),
  edit: () => import('./EditIcon.jsx'),
  exclamation: () => import('./ExclamationIcon.jsx'),
  order: () => import('./OrderIcon.jsx'),
  search: () => import('./SearchIcon.jsx'),
  settings: () => import('./SettingsIcon.jsx'),
  shopBag: () => import('./ShopBagIcon.jsx'),
  squares: () => import('./SquaresIcon.jsx'),
  stats: () => import('./StatsIcon.jsx'),
  trash: () => import('./TrashIcon.jsx'),
  uploadImg: () => import('./UploadImgIcon.jsx'),
  users: () => import('./UsersIcon.jsx'),
};
