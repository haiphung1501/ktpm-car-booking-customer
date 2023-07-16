import {TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ReviewInput = ({onRating, value}) => {
  return (
    <View className="flex flex-row items-center gap-2 mx-auto">
      {[1, 2, 3, 4, 5].map(index => (
        <TouchableOpacity key={index} onPress={() => onRating(index)}>
          <MaterialIcons
            name="star"
            size={50}
            color={value >= index ? '#FAB005' : '#DEE2E6'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ReviewInput;
