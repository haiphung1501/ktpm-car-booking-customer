import {Text} from 'react-native';
import CustomModal from './CustomModal';

const DeleteAddressModal = ({open, onClose, onDelete}) => {
  return (
    <CustomModal
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onOk={onDelete}
      cancelText="Huỷ"
      okText="Xoá địa chỉ"
      title="Xác nhận xoá địa chỉ"
      content={
        <Text className="text-lg text-center text-black">
          Bạn muốn xoá địa chỉ?
        </Text>
      }
    />
  );
};

export default DeleteAddressModal;
