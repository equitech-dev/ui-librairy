// Export des icônes SVG
export { default as BoxIcon } from './box_icon.svg';
export { default as CartIcon } from './cart_icon.svg';
export { default as ChevronIcon } from './chevron_icon.svg';
export { default as EditIcon } from './edit_icon.svg';
export { default as ExclamationIcon } from './exclamation_icon.svg';
export { default as OrderIcon } from './order_icon.svg';
export { default as SearchIcon } from './search_icon.svg';
export { default as SettingsIcon } from './settings_icon.svg';
export { default as ShopBagIcon } from './shop-bag_icon.svg';
export { default as SquaresIcon } from './squares_icon.svg';
export { default as StatsIcon } from './stats_icon.svg';
export { default as TrashIcon } from './trash_icon.svg';
export { default as UploadImgIcon } from './upload-img_icon.svg';
export { default as UsersIcon } from './users_icon.svg';

// Export par défaut de toutes les icônes
export const icons = {
  box: () => import('./box_icon.svg'),
  cart: () => import('./cart_icon.svg'),
  chevron: () => import('./chevron_icon.svg'),
  edit: () => import('./edit_icon.svg'),
  exclamation: () => import('./exclamation_icon.svg'),
  order: () => import('./order_icon.svg'),
  search: () => import('./search_icon.svg'),
  settings: () => import('./settings_icon.svg'),
  shopBag: () => import('./shop-bag_icon.svg'),
  squares: () => import('./squares_icon.svg'),
  stats: () => import('./stats_icon.svg'),
  trash: () => import('./trash_icon.svg'),
  uploadImg: () => import('./upload-img_icon.svg'),
  users: () => import('./users_icon.svg'),
};
