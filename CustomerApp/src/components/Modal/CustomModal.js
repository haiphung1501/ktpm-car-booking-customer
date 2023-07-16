import {Dimensions, StyleSheet, View} from 'react-native';
import CustomButton from '../CustomButton';
import {Modal, Text} from 'react-native-paper';

const CustomModal = ({
  open,
  okText,
  title,
  cancelText,
  onOk,
  onCancel,
  content,
  onClose,
}) => {
  const showOk = [okText, onOk].some(prop => !!prop);
  const showCancel = [cancelText, onCancel].some(prop => !!prop);
  const showFooter = showOk || showCancel;
  return (
    <Modal transparent={true} animationType="slide" visible={open}>
      <View
        style={{
          marginHorizontal: '5%',
          backgroundColor: '#ffffff',
          padding: 20,
          borderRadius: 16,
        }}>
        {title && (
          <Text className="text-xl font-bold mb-4 text-center text-black">
            {title}
          </Text>
        )}
        {content}
        {showFooter && (
          <View className="flex flex-row items-center gap-2">
            {showCancel && (
              <View className="flex-1">
                <CustomButton
                  wrapperClass="mt-6 flex-1 bg-white p-4 mb-0 rounded-lg border-2 border-green-600 flex flex-row items-center justify-center"
                  textClass="text-green-500 font-bold text-lg"
                  onPress={onCancel}
                  label={cancelText || 'Huỷ'}
                />
              </View>
            )}
            {showOk && (
              <View className="flex-1">
                <CustomButton
                  wrapperClass="mt-6 p-4 mb-0 rounded-lg bg-green-600 flex flex-row items-center justify-center"
                  textClass="text-white font-bold text-lg"
                  onPress={onOk}
                  label={okText || 'Ok'}
                />
              </View>
            )}
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default CustomModal;
