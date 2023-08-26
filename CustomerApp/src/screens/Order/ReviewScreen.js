import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ReviewInput from '../../components/Review/ReviewInput';
import {useState} from 'react';
import MultiSelect from 'react-native-multiple-select';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import {BASE_URL} from '../../config';
import {useHistoryStore} from '../../store/historyStore';
import {classNames} from '../../utils/classNames';

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

const ReviewScreen = ({route, navigation}) => {
  const [rating, setRating] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const {orderId} = route.params;
  const order = useHistoryStore.use.getBooking()(orderId);
  const reviewBooking = useHistoryStore.use.reviewBooking();

  const handleSubmit = () => {
    setShow(true);
    setLoading(true);
    axios
      .put(`${BASE_URL}/booking/review/${order._id}`, {
        rating,
        comment: selectedItems.map(item => COMMENTS[item].name).join(', '),
      })
      .then(() => {
        reviewBooking(order._id);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  return (
    <ScrollView className="bg-white">
      <View className="py-6">
        <View className="w-[200px] h-[200px] rounded-full bg-gray-100 mx-auto mb-8" />
        <Text className="text-center text-base font-bold">
          Trải nghiệm của bạn trong chuyến đi với
        </Text>
        <Text className="text-center text-lg text-gray-500 font-bold mb-2">
          Tài xế {order.userId.displayName}
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
            onPress={() => handleSubmit()}
            wrapperClass="mt-6 p-4 mb-0 rounded-lg bg-green-600 flex flex-row items-center justify-center"
            textClass="text-white font-bold text-lg"
            label="Đánh giá"
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => {
          setModalVisible(!show);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {loading ? (
              <Text style={styles.modalText}>Loading...</Text>
            ) : (
              <>
                <Text
                  style={styles.modalText}
                  className={classNames('text-green-700 font-medium', {
                    'text-red-500': error,
                  })}>
                  {!error ? 'Action successfull!' : 'Action failure!'}
                </Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setShow(!show);
                    !error && navigation.goBack();
                  }}>
                  <Text style={styles.textStyle}>Back</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ReviewScreen;
