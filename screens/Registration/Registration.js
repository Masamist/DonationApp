import React, {useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import {createUser} from '../../api/user'

import style from './style';
import globalStyle from '../../assets/styles/globalStyle';
import Button from '../../components/Button/Button';
import BackButton from '../../components/BackButton/BackButton'

const Registration = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  return (
    <View style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <View style={style.backButton}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={style.container}>
        <View style={globalStyle.marginBottom24}>
          <Header type={1} title={'Hello and Welcome!'} />
        </View>
        <View style={globalStyle.marginBottom24}>
          <Input 
            label={'First & Last Name'} 
            placeholder={'Enter your Full Name...'}
            onChangeText={(value) => setFullName(value)}
          />
        </View>
        <View style={globalStyle.marginBottom24}>
          <Input 
            label={'Email'} 
            placeholder={'Enter your Email...'}
            keyboardType={'email-address'}
            onChangeText={(value) => setEmail(value)}
          />
        </View>
        <View style={globalStyle.marginBottom24}>
          <Input 
            secureTextEntry={true}
            label={'Password'} 
            placeholder={'******'}
            onChangeText={(value) => setPassword(value)}
          />
        </View>
        {error.length > 0 && <Text style={style.error}>{error}</Text>}
        {success.length > 0 && <Text style={style.success}>{success}</Text>}
        <View style={globalStyle.marginBottom24}>
          <Button
            isDisabled={
              fullName.length <= 2 || email.length <= 5 || password.length < 8
            }
            title={'Registration'}
            onPress={async () => {
              let user = await createUser(fullName, email, password);
              if (user.error) {
                setError(user.error);
              } else {
                setError('');
                setSuccess('You have successfully registered');
                setTimeout(() => navigation.goBack(), 3000);
              }
            }}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default Registration;