import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import Images from '../../utils/sources';

const Header = () => {
  return (
    <View className="h-[200xp] bg-transparent">
      <Image
        source={Images.BgImg}
        className="w-full h-[200px] opacity-80 -mt-2.5"
      />
      <TouchableOpacity className="absolute flex flex-row flex-nowrap top-4 right-4 items-center px-4 py-3 bg-green-200 rounded-full">
        <Image source={Images.Map} className="w-[25px] h-[25px] mr-1" />
        <Text className="text-xl font-bold">Maps</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
