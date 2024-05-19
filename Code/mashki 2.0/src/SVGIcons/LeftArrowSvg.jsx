// import liraries
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {scale} from '../utils/responsive';
import Svg, {Path} from 'react-native-svg';

// create a component
const LeftArrowSvg = ({SvgHeight, SvgWidth, fillColor, onPress, top, left}) => (
  <TouchableOpacity
    style={{
      position: 'absolute',
      left: scale(left || -22),
      top: scale(top || -14),
      paddingVertical: scale(20),
      paddingHorizontal: scale(20),
    }}
    onPress={onPress}>
    <Svg
      width={SvgWidth || '12'}
      height={SvgHeight || '20'}
      viewBox="0 0 12 20"
      fill={fillColor || 'red'}
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M10 20L0 10L10 0L11.775 1.775L3.55 10L11.775 18.225L10 20Z"
        fill={fillColor || 'red'}
      />
    </Svg>
  </TouchableOpacity>
);

// make this component available to the app
export default LeftArrowSvg;
