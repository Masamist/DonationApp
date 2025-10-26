import React from 'react';
import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../../components/Header/Header'
import Button from '../../components/Button/Button';
import Tab from '../../components/Tab/Tab';
import Badge from '../../components/Badge/Badge';
import Search from '../../components/Search/Search';
import SingleDonationItem from '../../components/SingleDonationItem/SingleDonationItem';

import style from './style';
import globalStyle from '../../assets/styles/globalStyle';



const Home = () => {
  const user = useSelector(state => state.user);
  const dispach = useDispatch();
  return (
    <View style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.header}>
          <View>
            <Text style={style.headerIntroText}>Hello, </Text>
            <View style={style.userName}>
              <Header title={user.firstName + ' ' +  user.lastName[0] + '.👋'} />
            </View>
          </View>
          <Image source={{uri: user.profileImage}} style={style.profileImage} resizeMode={'contain'} />
        </View>
        <View style={style.searchBox}>
          <Search />
        </View>
        <Pressable style={style.highlightedImageContainer}>
          <Image
            style={style.highlightedImage}
            source={require('../../assets/images/highlighted_image.png')} 
            resizeMode={'contain'} />
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default Home;