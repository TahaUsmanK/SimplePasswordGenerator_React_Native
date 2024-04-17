import {ActivityIndicator, Text, TextInput, View} from 'react-native';
import APIService from '../../service/api_service/api_service';
import React, {useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import TextInputStyle from '../../style/textInput_style/textInput_style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeStyle from '../../style/home_style/home_style';

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [textInput, setTextInput] = useState('8');
  const [textInputValidation, setTextInputValidation] = useState(false);

  const FetchData = async () => {
    await APIService(textInput, setData);
  };

  const validateTextInput = async () => {
    if (textInput.length > 0) {
      setTextInputValidation(true);
      await FetchData();
    } else {
      setTextInputValidation(false);
    }
  };

  const copyToClipboard = () => {
    if (data && data.random_password) {
      Clipboard.setString(data.random_password);
      alert('Password Copied');
    }
  };

  return (
    <View>
      <View style={HomeStyle.appBar}>
        <TextInput
          style={TextInputStyle.textInput}
          keyboardType="numeric"
          onChangeText={value => setTextInput(value)}
          value={textInput}
          placeholder={
            textInputValidation
              ? 'Password Length must be greater than 0'
              : 'Enter Password Length'
          }
          placeholderTextColor={textInputValidation ? 'red' : 'gray'}
        />
        <Icon.Button
          name="search"
          backgroundColor="transparent"
          iconStyle={HomeStyle.iconStyle}
          onPress={() => validateTextInput()}
          underlayColor={'white'}
        />
      </View>
      {data ? (
        <View style={HomeStyle.textView}>
          <Text>Generated Password: </Text>
          <Text onLongPress={copyToClipboard} style={HomeStyle.text}>
            {data.random_password}
          </Text>
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default HomeScreen;
