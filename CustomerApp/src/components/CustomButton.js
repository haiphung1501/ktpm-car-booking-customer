import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {classNames} from '../utils/classNames';

const CustomButton = ({
  label,
  options,
  wrapperClass,
  textClass,
  onPress,
  disabled,
}) => {
  const handlePress = () => {
    !disabled && onPress();
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={handlePress}
      style={options?.style}
      className={classNames(
        'bg-[#AD40AF] p-5 rounded-[10px] mb-[30px]',
        wrapperClass,
        {'bg-gray-400': disabled},
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
