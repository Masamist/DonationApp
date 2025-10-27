import React from 'react-native';
import { ScrollView, View, Image, Text } from 'react-native';
import { useSelector } from 'react-redux';

import BackButton from '../../components/BackButton/BackButton';
import Badge from '../../components/Badge/Badge';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';

import style from './style';
import globalStyle from '../../assets/styles/globalStyle';


const SingleDonationItem = ({navigation, route}) => {
  const donationItemInformation = useSelector(
    state => state.donations.selectedDonationInformation,
  );
  const categoryInformation = route.params.categoryInformation;
  return (
    <View style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <ScrollView showsVerticalScrollIndicator={false} style={style.container}>
        <BackButton onPress={() => navigation.goBack()} /> 
        <Image source={{uri: donationItemInformation.image}} style={style.image} />
        <View style={style.badge}>
          <Badge title={categoryInformation.name} />
        </View>
        <Header title={donationItemInformation.name} type={1} />
        <Text style={style.description}>
          {donationItemInformation.description}
        </Text>
      </ScrollView>
      <View style={style.button}>
        <Button title={'Donate'} />
      </View>
    </View>
  )
}

export default SingleDonationItem;