import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
  Image,
} from 'react-native';
import ScreenTemplate from '../../components/ScreenTemplate';
import DrawerIcon from '../../assets/SVGs/DrawerIcon.svg';
import StylishLogo from '../../assets/SVGs/StylishLogo.svg';
import ProfilePic from '../../assets/SVGs/ProfilePic.svg';
import SearchComponent from '../../components/SearchComponent';
import {fs, hp, wp} from '../../helpers/ResponsiveFonts';
import {Colors} from '../../helpers/colors';
import FilterIcon from '../../assets/SVGs/FilterIcon.svg';
import SortIcon from '../../assets/SVGs/SortIcon.svg';
import FeaturesComponent from '../../components/FeaturesComponent';
import {
  AdsCardsData,
  FearuresData,
  ShoppingCardData,
  TrendingProductsData,
} from '../../helpers/appData';
import AdsCard from '../../components/AdsCard';
import RightArrow from '../../assets/SVGs/RightArrow.svg';
import ShoppingCard from '../../components/ShoppingCard';
import SpecialOfferImage from '../../assets/SVGs/SpecialOfferImage.svg';
import Heels from '../../assets/SVGs/HeelsImage/Heels.svg';
import Rectangle from '../../assets/SVGs/HeelsImage/Rectangle.svg';
import GroupStars from '../../assets/SVGs/HeelsImage/GroupStars.svg';
import TrendingProductsCard from '../../components/TrendingProductsCard';
import HotSummerSale from '../../assets/SVGs/HotSummerSale.svg';
import Sponsered from '../../assets/SVGs/Sponsered.svg';
import axios from 'axios';
import {
  setAddresses,
  setMyorders,
  setProducts,
  setProfileData,
  setProfilePhoto,
} from '../../Store/Reducer';
import {useDispatch, useSelector} from 'react-redux';
import {Products} from '../../helpers/interface';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import BackIcon from '../../assets/SVGs/BackIcon.svg';
import {Images} from '../../helpers/images';
import auth from '@react-native-firebase/auth';
import ProfileView from '../../components/ProfileView';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const baseUrl = 'https://dummyjson.com/products';
interface HomeProps {}

const Home = (props: HomeProps) => {
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const dispatch = useDispatch();
  const stateData = useSelector(state => state.Reducers);
  console.log('====>', stateData);

  const navigation = useNavigation();
  const today = new Date();
  const yesterday = new Date(today.setDate(today.getDate() - 1));

  const handleDOD = category => {
    HideBottomTab();
    navigation.navigate('ProductsScreen', {category: category});
  };
  const HideBottomTab = () => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  };
  useEffect(() => {
    // axios({
    //   method: 'get',
    //   url: baseUrl,
    // }).then(response => {
    //   console.log(response.data.products);
    // });

    // axios.get(baseUrl).then(response => {
    //   console.log(
    //     ' ---------------------------------- Response.Data-----\n ',
    //     response.data.products,
    //   );

    // let dataArray = response.data.products.map(item => {
    //   return ((item.fav = false), (item.ratingcount = 500)), item;
    // });
    // console.log('dataArray----------------', dataArray);

    getProfileImage();
    getFirebaseData();

    const dataArray = stateData.products;

    // dispatch(setProducts(dataArray));
    setData(dataArray);
    setCategoryData(dataArray);
    const ids = dataArray.map(({category}: Products) => category);
    const tempData = dataArray.filter(({category}: Products, index: number) => {
      return !ids.includes(category, index + 1);
    });

    console.log('--------------------tempData', tempData);

    // setFilterData([{ category: 'View All' }, ...tempData]);
    setFilterData(tempData);
    // });
  }, []);

  const Logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const getProfileImage = async () => {
    const ImageProfile = await storage()
      ?.ref()
      ?.child('Images/profile.png')
      ?.getDownloadURL();
    ImageProfile
      ? dispatch(setProfilePhoto(ImageProfile))
      : dispatch(setProfilePhoto(Images.StaticProfilePic));
  };

  const getFirebaseData = async () => {
    const Addresses = await firestore()
      .collection('Users')
      .doc(`Addresses-${auth()?.currentUser?.uid}`)
      .get();
    const myorders = await firestore()
      .collection('Users')
      .doc(`myorders-${auth()?.currentUser?.uid}`)
      .get();
    const Profile = await firestore()
      .collection('Users')
      .doc(`Profile-${auth()?.currentUser?.uid}`)
      .get();

    dispatch(setAddresses(Addresses));
    dispatch(setMyorders(myorders));
    dispatch(setProfileData(Profile));
  };

  return (
    <ScreenTemplate>
      <View style={styles.Header}>
        <TouchableOpacity onPress={Logout}>
          <DrawerIcon />
        </TouchableOpacity>
        {/* <View style={styles.StylishLogo}> */}
        <StylishLogo />
        {/* </View> */}
        <ProfileView />
      </View>
      {/* <View style={styles.SearchComponent}>
        <SearchComponent />
      </View> */}
      <View style={styles.Features}>
        {/* <View style={styles.AllFeaturedView}> */}
        <Text style={styles.AllFeatured}>All Featured</Text>
        {/* </View> */}
        {/* <View style={{flexDirection: 'row'}}>
          <Pressable style={styles.Sort}>
            <Text>Sort</Text>
            <SortIcon />
          </Pressable>
          <Pressable style={styles.Filter}>
            <Text>Filter</Text>
            <FilterIcon />
          </Pressable>
        </View> */}
      </View>

      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.FeaturesComponent}>
          <FeaturesComponent Data={filterData} />
        </View>
        <View style={styles.Adscard}>
          <AdsCard Data={AdsCardsData} />
        </View>
        <View style={styles.DealoftheDay}>
          <View style={styles.DOD1}>
            <Text style={styles.DODText1}>Deal of the Day</Text>
            <Text style={styles.DODText2}>🕒 22h 55m 20s remaining</Text>
          </View>
          <Pressable
            style={styles.ViewAll}
            onPress={() => handleDOD(`smartphones`)}>
            <Text style={styles.ViewAllText}>View all</Text>
            <RightArrow />
          </Pressable>
        </View>
        <View style={styles.FeaturesComponent}>
          <ShoppingCard
            Data={data.filter((item, index) => item.category == `smartphones`)}
          />
        </View>
        <View style={styles.SpecialOfferView}>
          <Pressable style={styles.SpecialOfferImage}>
            <SpecialOfferImage />
          </Pressable>
          <View style={styles.DOD1}>
            <Text style={styles.SOText1}>
              Special Offers <Text style={styles.SOemoji}>😱</Text>
            </Text>
            <Text style={styles.SOText2}>
              We make sure you get the offer you need at best prices
            </Text>
          </View>
        </View>
        <View style={[styles.SpecialOfferView]}>
          <View style={styles.HeelsImage}>
            <View>
              <Rectangle />
            </View>
            <View style={styles.GroupStars}>
              <GroupStars />
            </View>
            <View style={styles.Heels}>
              <Image source={Images.iphone} style={styles.HeelsPhoto} />
            </View>
          </View>
          <View style={{marginTop: 35}}>
            <Text style={styles.HeelsText1}>Iphone 11</Text>
            <Text style={styles.HeelsText2}>
              Stand a chance to get rewarded
            </Text>
            <Pressable
              style={styles.Visitnow}
              onPress={() => handleDOD('smartphones')}>
              <Text style={styles.VisitnowText}>Visit now</Text>
              <RightArrow />
            </Pressable>
          </View>
        </View>
        <View
          style={[
            styles.DealoftheDay,
            {backgroundColor: Colors.TrendyProducts, marginTop: hp(16)},
          ]}>
          <View style={styles.DOD1}>
            <Text style={styles.DODText1}>Trending Products</Text>
            <Text style={styles.DODText2}>
              🗓️ Last Date {yesterday.toLocaleDateString('en-IN')}
            </Text>
          </View>
          <Pressable
            style={styles.ViewAll}
            onPress={() => handleDOD(`skincare`)}>
            <Text style={styles.ViewAllText}>View all</Text>
            <RightArrow />
          </Pressable>
        </View>
        <View style={styles.FeaturesComponent}>
          <TrendingProductsCard
            Data={data.filter(item => item.category == 'skincare')}
          />
        </View>
        <View style={styles.HotSummerSale}>
          <HotSummerSale />
          <View style={styles.NewArrivals}>
            <View style={styles.DOD1}>
              <Text
                style={[
                  styles.DODText1,
                  {fontSize: fs(20), color: Colors.Black, marginBottom: hp(4)},
                ]}>
                New Arrivals
              </Text>
              <Text
                style={[
                  styles.DODText2,
                  {fontSize: fs(16), color: Colors.Black},
                ]}>
                Summer’s 25 Collections
              </Text>
            </View>
            <Pressable
              style={[
                styles.ViewAll,
                {
                  backgroundColor: Colors.Visitnow,
                },
              ]}
              onPress={() => handleDOD(`ViewAll`)}>
              <Text style={styles.ViewAllText}>View all</Text>
              <RightArrow />
            </Pressable>
          </View>
        </View>
        {/* <View style={styles.sponserdView}>
          <Text style={styles.sponserdText}>Sponserd</Text>
          <Sponsered />
          <View style={styles.FiftyOffView}>
            <Text style={styles.FiftyOff}>up to 50% Off</Text>
            <Text style={[styles.FiftyOff, {width: 'auto'}]}>{'>'}</Text>
          </View>
        </View> */}
      </ScrollView>
    </ScreenTemplate>
  );
};

export default Home;

const styles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // DrawerIcon: {backgroundColor: 'red'},
  // StylishLogo: {alignItems: 'center', backgroundColor: 'green'},
  // ProfilePic: {alignItems: 'flex-end', backgroundColor: 'yellow'},
  SearchComponent: {
    alignItems: 'center',
    marginVertical: hp(16),
  },
  Features: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 1,
    marginBottom: hp(10),
  },
  AllFeaturedView: {
    // width: wp(192),
  },
  Sort: {
    width: wp(61),
    marginRight: wp(12),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: Colors.white,
    paddingHorizontal: wp(8),
    paddingVertical: hp(4),
    borderRadius: 6,
    fontFamily: 'Montserrat-Regular',
    color: Colors.Black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: fs(12),
  },
  Filter: {
    width: wp(67),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: Colors.white,
    paddingHorizontal: wp(8),
    paddingVertical: hp(4),
    borderRadius: 6,
    fontFamily: 'Montserrat-Regular',
    color: Colors.Black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: fs(12),
  },
  AllFeatured: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: fs(20),
    color: Colors.Black,
    marginTop: hp(20),
  },
  FeaturesComponent: {
    marginTop: hp(17),
    paddingVertical: hp(8),
    paddingLeft: wp(8),
    backgroundColor: Colors.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  Adscard: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(1),
    // backgroundColor: 'red',
    // borderWidth: 1,
    height: hp(194),
    marginTop: hp(16),
    padding: hp(1.2),
  },
  DealoftheDay: {
    flexDirection: 'row',
    marginTop: hp(40),
    // borderWidth: 1,
    backgroundColor: Colors.DealofthDay,
    paddingVertical: hp(8),
    paddingHorizontal: wp(8),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  DOD1: {
    width: wp(234),
  },
  DODText1: {
    color: Colors.white,
    fontSize: fs(16),
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    marginBottom: hp(8),
  },
  DODText2: {
    color: Colors.white,
    fontSize: fs(12),
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
    // marginBottom: hp(8),
  },
  ViewAll: {
    borderWidth: 1,
    height: fs(32),
    paddingHorizontal: wp(10),
    paddingVertical: hp(6),
    borderRadius: 4,
    borderColor: Colors.white,
    // marginTop: hp(8),
    // marginLeft: wp(24),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewAllText: {
    color: Colors.white,
    fontSize: fs(12),
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(4),
  },
  SpecialOfferView: {
    flexDirection: 'row',
    marginTop: hp(16),
    // borderWidth: 1,
    backgroundColor: Colors.white,
    paddingVertical: hp(12),
    paddingHorizontal: wp(8),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderRadius: 6,
  },
  SpecialOfferImage: {
    marginRight: wp(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  SOText1: {
    color: Colors.Black,
    fontSize: fs(16),
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(4),
    // borderWidth: 1,
  },
  SOText2: {
    color: Colors.Black,
    fontSize: fs(12),
    fontWeight: '300',
    fontFamily: 'Montserrat-Regular',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(4),
    width: wp(171),
    marginTop: hp(8),
  },
  SOemoji: {
    borderWidth: 1,
    marginLeft: 10,
  },
  HeelsImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  GroupStars: {
    right: wp(10),
    // borderWidth: 1,
  },
  Heels: {
    right: wp(70),
    // borderWidth: 1,
  },
  HeelsText1: {
    // right: wp(50),
    // top: hp(50),
    color: Colors.Black,
    fontSize: fs(16),
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    width: wp(150),
  },
  HeelsText2: {
    // right: wp(50),
    // top: hp(50),
    color: Colors.Black,
    fontSize: fs(10),
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
  },
  VisitnowText: {
    color: Colors.white,
    fontSize: fs(12),
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
  },
  Visitnow: {
    borderWidth: 1,
    height: hp(24),
    width: wp(92),
    borderRadius: 4,
    borderColor: Colors.Visitnow,
    backgroundColor: Colors.Visitnow,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  HotSummerSale: {
    marginTop: hp(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(10),
  },
  NewArrivals: {
    flexDirection: 'row',
    width: wp(343),
    // marginTop: hp(40),
    // borderWidth: 1,
    backgroundColor: Colors.white,
    paddingVertical: hp(8),
    paddingHorizontal: wp(8),
    // borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sponserdView: {
    paddingHorizontal: wp(16),
    backgroundColor: Colors.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: wp(343),
    alignSelf: 'center',
    marginVertical: hp(24),
    overflow: 'scroll',
  },
  sponserdText: {
    color: Colors.Black,
    fontSize: fs(20),
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    marginBottom: hp(12),
  },
  FiftyOff: {
    color: Colors.Black,
    fontSize: fs(16),
    fontWeight: '700',
    fontFamily: 'Montserrat-Regular',
    marginVertical: hp(12),
    width: wp(200),
    // borderWidth: 1,
  },
  FiftyOffView: {
    flexDirection: 'row',
    // borderWidth: 1,
    width: wp(327),
    justifyContent: 'space-between',
  },
  HeelsPhoto: {
    height: hp(100),
    width: wp(100),
  },
  ProfilePic: {
    height: hp(40),
    width: wp(40),
    borderRadius: 20,
  },
});
