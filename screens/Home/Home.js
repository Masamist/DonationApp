import React, {useState, useEffect} from 'react';
import {Routes} from '../../navigation/Routes';
import { View, Text, ScrollView, Image, Pressable, FlatList } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../../components/Header/Header'
import Button from '../../components/Button/Button';
import Tab from '../../components/Tab/Tab';
import Badge from '../../components/Badge/Badge';
import Search from '../../components/Search/Search';
import SingleDonationItem from '../../components/SingleDonationItem/SingleDonationItem';

import style from './style';
import globalStyle from '../../assets/styles/globalStyle';
import { updateSelectedCategoryId } from '../../redux/reducers/Categories';
import { updateSelectedDonationId } from '../../redux/reducers/Donations';

const Home = ({navigation}) => {
  const categories = useSelector(state => state.categories)
  const donations = useSelector(state => state.donations)
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [donationItems, setDonationItems] = useState([]);
  const [categoryPage, setCategoryPage] = useState(1);
  const [categoryList, setCategoryList] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const categoryPageSize = 4;

  useEffect(() => {
    const items = donations.items.filter(value =>
      value.categoryIds.includes(categories.selectedCategoryId),
    );
    setDonationItems(items);
  }, [categories.selectedCategoryId]);

  useEffect(() => {
    setIsLoadingCategories(true)
    setCategoryList(pagination(categories.categories, categoryPage, categoryPageSize));
    setCategoryPage(prev => prev+1)
    setIsLoadingCategories(false)
  }, [])

  const pagination = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber -1)*pageSize;
    const endIndex = startIndex + pageSize;
    if(startIndex >= items.length){
      return[]
    }
    return items.slice(startIndex,endIndex);
  }

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
        <View style={style.categotyHeader}>
          <Header title={'Select Category'} type={2} />
        </View>
        <View style={style.categories}>
          <FlatList
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if(isLoadingCategories) return;
              setIsLoadingCategories(true)
              let newData = pagination(
                categories.categories,
                categoryPage,
                categoryPageSize,
              );
              if (newData.length > 0) {
                setCategoryList(prevState => [...prevState, ...newData]);
                setCategoryPage(prevState => prevState + 1);
              }
              setIsLoadingCategories(false);
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={categoryList} 
            renderItem={({item}) => (
              <View style={style.categoryItem} key={item.categoryId}>
                <Tab
                  tabId={item.categoryId}
                  onPress={(value) => dispatch(updateSelectedCategoryId(value))}
                  title={item.name}
                  isInactive={item.categoryId !== categories.selectedCategoryId} />
              </View>
            )} 
          />
        </View>
        {donationItems.length > 0 && 
          <View style={style.donationItemsContainer}>
            {donationItems.map(value => {
              const categoryInformation = categories.categories.find(
                val => val.categoryId === categories.selectedCategoryId,
              )
              return(
                <View 
                  key={value.donationItemId} 
                  style={style.singleDonationItem}>
                  <SingleDonationItem
                    onPress={selectedDonationId => {
                        dispatch(updateSelectedDonationId(selectedDonationId));
                        navigation.navigate(Routes.SingleDonationItem, {
                          categoryInformation,
                        });
                      }}
                    donationItemId={value.donationItemId}
                    uri={value.image}
                    badgeTitle={categories.categories.filter(val => val.categoryId === categories.selectedCategoryId)[0].name}
                    donationTitle={value.name}
                    price={parseFloat(value.price)}
                  />
              </View>
              )
            })}
        </View>}
      </ScrollView>
    </View>
  );
};

export default Home;