import {ScrollView, Text, View} from 'react-native';
import ReviewInput from '../../components/Review/ReviewInput';
import {useState} from 'react';
import MultiSelect from 'react-native-multiple-select';
import CustomButton from '../../components/CustomButton';

const COMMENTS = [
  {
    id: 1,
    name: 'Tài xế thân thiện',
  },
  {
    id: 2,
    name: 'Đến đúng giờ',
  },
  {
    id: 3,
    name: 'Tài xế không thân thiện',
  },
  {
    id: 4,
    name: 'Tài xế đến trễ',
  },
  {
    id: 5,
    name: 'Tài xế không có mũ bảo hiểm',
  },
];

const ReviewScreen = () => {
  const [rating, setRating] = useState();
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <ScrollView className="bg-white">
      <View className="py-6">
        <View className="w-[200px] h-[200px] rounded-full bg-gray-100 mx-auto mb-8" />
        <Text className="text-center text-base font-bold">
          Trải nghiệm của bạn trong chuyến đi với
        </Text>
        <Text className="text-center text-lg text-gray-500 font-bold mb-2">
          Tài xế Nguyễn Văn A
        </Text>
        <ReviewInput onRating={setRating} value={rating} />
        <View className="mx-6 mt-6">
          <MultiSelect
            hideSubmitButton={true}
            items={COMMENTS}
            uniqueKey="id"
            onSelectedItemsChange={setSelectedItems}
            selectedItems={selectedItems}
            selectText="Pick Items"
            searchInputPlaceholderText="Search Items..."
            onChangeInput={text => console.log(text)}
            tagRemoveIconColor="#2B8A3E"
            tagBorderColor="#099268"
            tagTextColor="#099268"
            selectedItemTextColor="#099268"
            selectedItemIconColor="#099268"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{color: '#CCC'}}
          />
          <CustomButton
            wrapperClass="mt-6 p-4 mb-0 rounded-lg bg-green-600 flex flex-row items-center justify-center"
            textClass="text-white font-bold text-lg"
            label="Đánh giá"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ReviewScreen;
