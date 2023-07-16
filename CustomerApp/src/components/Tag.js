import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {classNames} from '../utils/classNames';

const Tag = ({title, active, onClick}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      className={classNames(
        'p-4 rounded-lg min-w-[100px] bg-white border-teal-600 border-2',
        {
          'bg-teal-600': active,
        },
      )}>
      <Text
        className={classNames('font-bold text-center text-teal-600', {
          'text-white': active,
        })}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Tag;
