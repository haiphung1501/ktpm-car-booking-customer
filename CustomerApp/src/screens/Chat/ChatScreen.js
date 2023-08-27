import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {BASE_URL} from '../../config';
import axios from 'axios';
import {useBookingStore} from '../../store/bookingStore';

const ChatScreen = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const {idBooking} = route.params;
  const updatedBooking = useBookingStore.use.booking();

  useEffect(() => {
    if (updatedBooking.messages.length > 0) {
      console.log('Message: ', updatedBooking);
      if (
        updatedBooking.messages[updatedBooking.messages.length - 1].sender
          ._id === updatedBooking.driverId._id
      ) {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, {
            _id: updatedBooking.messages[updatedBooking.messages.length - 1]
              ._id,
            text: updatedBooking.messages[updatedBooking.messages.length - 1]
              .content,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: updatedBooking.driverId.displayName,
              avatar: updatedBooking.driverId.avatar.url,
            },
          }),
        );
      }
    }
  }, [updatedBooking]);

  const onSend = useCallback(messages => {
    var dataInput = {content: messages[0].text};
    console.log(messages[0]);
    if (messages[0].text != null) {
      axios
        .put(`${BASE_URL}/booking/msg/${idBooking}`, dataInput)
        .then(res => {
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
          );
        })
        .catch(e => {
          console.log(`Send message error ${e}`);
        })
        .finally(() => {});
    }
  }, []);

  const renderSend = props => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
