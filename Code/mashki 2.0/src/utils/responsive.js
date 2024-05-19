/**
 * Problem: React Native accepts either percentages or
 * density-independent pixels (DP) for its styles.
 * Percentages work well on the web,
 * but they don't support all the style properties in React Native.
 * Only padding, margin, width, height, minWidth, minHeight,
 * maxWidth, maxHeight, flexBasis can have percentage values
 * according to this commit.
 * https://github.com/facebook/react-native/commit/3f49e743bea730907066677c7cbfbb1260677d11
 * Density independent pixels (DP) are different than traditional pixels.
 * The bigger the device, the more DP it has. However,
 * density-independent pixels (DP) vary from device to device,
 * so it cannot be directly used for creating a responsive layout.
 *
 * In order to make the app look good on phones, tablets,
 * and a variety of other devices, we need to scale all of our styles.
 *
 * And we use the following scale function
 */

import {Dimensions, PixelRatio} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
export const SCREEN_WIDTH = screenWidth;
export const SCREEN_HEIGHT = screenHeight;
export const DEVICES = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
};

const iphone11Wscale = screenWidth / 414;
const iphone11Hscale = screenHeight / 896;
const ipadsHScale = screenHeight / 1024;
const ipadsWScale = screenWidth / 768;
const ipadsMiniHScale = screenHeight / 1133;
const ipadsMiniWScale = screenWidth / 744;

/**
 * Returns widthScale and heightScale for different breakpoints depending upon screen width
 */
const getWidthHeightScale = () => {
  let widthScale;
  let heightScale;
  if (screenWidth >= 768) {
    widthScale = ipadsWScale;
    heightScale = ipadsHScale;
  } else if (screenWidth >= 744) {
    widthScale = ipadsMiniWScale;
    heightScale = ipadsMiniHScale;
  } else {
    widthScale = iphone11Wscale;
    heightScale = iphone11Hscale;
  }
  return {widthScale, heightScale};
};

/**
 * Use iphone11Scale() function to scale your fonts,
 * margins and paddings w.r.t screen width and height
 * @param {number} size
 * pixel value to scale w.r.t screen dpi
 * @param {function} accessibilityScaleFactor
 * Func  to get Font size by PixelRatio.
 * @param {string} based
 * the value with respect to width or height
 * based = 'width' | 'height' default 'width',
 * https://github.com/NewBieBR/react-native-normalize/blob/master/src/index.ts
 * if accessibility is > 100% (1) than multiple font size with PixelRatio.
 * if accessibility is > 150% (1.5) than divide font size with PixelRatio + 1.8.

 */
export const scale = (size, accessibilityScaleFactor, based = 'width') => {
  let newSize;
  const {widthScale, heightScale} = getWidthHeightScale();
  newSize = based === 'height' ? size * heightScale : size * widthScale;

  if (accessibilityScaleFactor) {
    newSize = accessibilityScaleFactor(newSize);
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
