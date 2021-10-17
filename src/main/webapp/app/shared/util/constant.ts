import { translate } from 'react-jhipster';

export const AnimateLeft = () => {
  return 'animated slideInLeft';
};

export const AnimateRight = () => {
  return 'animated slideInLeft';
};

export const AnimateUp = () => {
  return 'animated slideInUp';
};

export const AnimateFadeIn = () => {
  return 'animated fadeIn';
};

export const AnimateSpeedIn = () => {
  return 'animated lightSpeedIn';
};

export const hideClosingDays = (days: number) => {
  if (days <= 30 && days >= 2) {
    return `${translate('explore.closes.in')} ${days} ${translate('explore.days')}`;
  } else if (days < 2 && days >= 0) {
    return translate('explore.closes.today');
  } else if (days < 0) {
    return translate('explore.closed');
  }
  return '';
};

export const HOME_URL = '/';
