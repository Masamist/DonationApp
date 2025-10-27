import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import PropTypes from 'prop-types';

import style from './style';

const Input = props => {
  const [value, setValue] = useState('')

  return (
    <View style={style.container}>
      <Text style={style.label}>{props.label}</Text>
      <TextInput
        placeholder={props.placeholder ? props.placeholder:null}
        value={value} 
        style={style.input}
        keyboardType={props.keyboardType ? props.keyboardType:null}
        secureTextEntry={props.secureTextEntry}
        onChangeText={ val => {
          setValue(val); 
          props.onChangeText(val);
        }} />
    </View>
  );
}
Input.defaultProps={
  onChangeText: () => {},
  keyboardType: 'default',
  secureTextEntry: false,
}

Input.propsType = {
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChangeText:PropTypes.func,
  keyboardType:PropTypes.string,
  secureTextEntry: PropTypes.bool,
}

export default Input;