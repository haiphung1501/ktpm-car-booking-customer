import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {classNames} from '../utils/classNames';

const CustomButton = ({label, options, wrapperClass, textClass, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={options?.style}
      className={classNames(
        'bg-[#AD40AF] p-5 rounded-[10px] mb-[30px]',
        wrapperClass,
      )}>
      <Text
        className={classNames(
          'text-center font-bold text-base text-white',
          textClass,
        )}
        style={options?.labelStyle}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
