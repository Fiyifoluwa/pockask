import {
  fontPixel,
  heightPixel,
  widthPixel,
} from '../utils/responsiveDimensions';
import {Palette} from './palette';
import {createTheme} from '@shopify/restyle';

const theme = createTheme({
  borderRadii: {
    none: 0,
    xxs: heightPixel(2),
    xs: heightPixel(4),
    x: heightPixel(6),
    s: heightPixel(8),
    sm: heightPixel(10),
    sml: heightPixel(12),
    m: heightPixel(16),
    md: heightPixel(18),
    l: heightPixel(20),
    ll: heightPixel(24),
    xl: heightPixel(32),
    xxl: heightPixel(36),
    xxxl: heightPixel(48),
  },

  colors: {
    ...Palette,
  },

  iconSizes: {
    sm: {
      height: heightPixel(10),
      width: widthPixel(10),
    },
    sml: {
      height: heightPixel(12),
      width: widthPixel(12),
    },
    m: {
      height: heightPixel(16),
      width: widthPixel(16),
    },
    l: {
      height: heightPixel(20),
      width: widthPixel(20),
    },
    buttonIcon: {
      height: heightPixel(21),
      width: widthPixel(21),
    },
    ll: {
      height: heightPixel(24),
      width: widthPixel(24),
    },
    xl: {
      height: heightPixel(32),
      width: widthPixel(32),
    },
    xxl: {
      height: heightPixel(36),
      width: widthPixel(36),
    },
    xxxl: {
      height: heightPixel(48),
      width: widthPixel(48),
    },
  },

  spacing: {
    xxs: heightPixel(2),
    xs: heightPixel(4),
    x: heightPixel(6),
    s: heightPixel(8),
    sm: heightPixel(10),
    sml: heightPixel(12),
    m: heightPixel(16),
    md: heightPixel(18),
    l: heightPixel(20),
    ll: heightPixel(24),
    xl: heightPixel(32),
    xxl: heightPixel(64),
    xxxl: heightPixel(128),
    none: 0,
  },

  textVariants: {
    bold12: {
      fontFamily: 'U8-Bold',
      fontSize: fontPixel(12),
      letterSpacing: 0.3,
      lineHeight: fontPixel(16.8),
    },
    bold14: {
      fontFamily: 'U8-Bold',
      fontSize: fontPixel(14),
      letterSpacing: 0.3,
      lineHeight: fontPixel(19.6),
    },
    bold16: {
      fontFamily: 'U8-Bold',
      fontSize: fontPixel(16),
      letterSpacing: 0.3,
      lineHeight: fontPixel(21),
    },
    bold24: {
      fontFamily: 'U8-Bold',
      fontSize: fontPixel(24),
      letterSpacing: 0.3,
      lineHeight: fontPixel(26.96),
    },
    buttonLabel: {
      fontFamily: 'U8-Regular',
      fontSize: fontPixel(15),
      letterSpacing: 0.3,
      lineHeight: fontPixel(21),
    },
    headerText: {
      fontFamily: 'U8-Bold',
      fontSize: fontPixel(32),
      letterSpacing: 0.3,
      lineHeight: fontPixel(50.4),
    },
    subHeaderText: {
      fontFamily: 'U8-Regular',
      fontSize: fontPixel(14),
      letterSpacing: 0.3,
      lineHeight: fontPixel(19.6),
    },
    toastText: {
      fontFamily: 'U8-Bold',
      fontSize: fontPixel(16),
      letterSpacing: 0.3,
      lineHeight: fontPixel(21),
    },
    regular8: {
      fontFamily: 'U8-Regular',
      fontSize: fontPixel(8),
      letterSpacing: 0.3,
      lineHeight: fontPixel(10),
    },
    regular10: {
      fontFamily: 'U8-Regular',
      fontSize: fontPixel(10),
      letterSpacing: 0.3,
      lineHeight: fontPixel(14),
    },
    regular12: {
      fontFamily: 'U8-Regular',
      fontSize: fontPixel(12),
      letterSpacing: 0.3,
      lineHeight: fontPixel(16.8),
    },
    regular14: {
      fontFamily: 'U8-Regular',
      fontSize: fontPixel(14),
      letterSpacing: 0.3,
      lineHeight: fontPixel(19.6),
    },
    regular16: {
      fontFamily: 'U8-Regular',
      fontSize: fontPixel(16),
      letterSpacing: 0.3,
      lineHeight: fontPixel(22.4),
    },
    regular24: {
      fontFamily: 'U8-Regular',
      fontSize: fontPixel(24),
      letterSpacing: 0.3,
      lineHeight: fontPixel(26.96),
    },
    regular32: {
      fontFamily: 'U8-Regular',
      fontSize: fontPixel(32),
      letterSpacing: 0.3,
      lineHeight: fontPixel(15.4),
    },
    textInputLabel: {
      fontFamily: 'U8-Regular',
      fontSize: fontPixel(12),
      letterSpacing: 0.3,
      lineHeight: fontPixel(16),
    },
  },
});

export default theme;
