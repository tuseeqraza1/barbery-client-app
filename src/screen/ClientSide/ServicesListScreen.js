import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import LoadingIndicator from '../../components/LoadingIndicator';
import Card from '../../components/Card';
import colors from '../../styles/colors';
import axios from '../../../config';

const Tab = createMaterialTopTabNavigator();

function ServicesList(props) {
  return (
    <>
      {props?.loading && <LoadingIndicator />}
      <View style={styles.screen}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 15 }}
          style={styles.flatScreen}
          data={props.listings}
          keyExtractor={(listing) => listing._id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.name}
              subTitle={'Rs.' + item.cost}
              category={item.category}
              about={item.description}
              image={`data:${item?.picture?.type};base64,${item?.picture?.data}`}
            />
          )}
        />
      </View>
    </>
  );
}

function PackagesList(props) {
  return (
    <>
      {props?.loading && <LoadingIndicator />}
      <View style={styles.screen}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 15 }}
          style={styles.flatScreen}
          data={props.listings}
          keyExtractor={(listing) => listing._id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.name}
              subTitle={'Rs.' + item.cost}
              category={'Package Deal'}
              about={item.description}
              image={`data:${item?.picture?.type};base64,${item?.picture?.data}`}
            />
          )}
        />
      </View>
    </>
  );
}

function ServicesListScreen({ route }) {
  const [Services, setServices] = useState([]);
  const [Packages, setPackages] = useState([]);
  const [loading, setLoading] = React.useState(false);

  const getServices = async () => {
    const res = await axios.get('/saloon/saloonServices/' + route.params.id);
    setServices(res.data);
    setLoading(false);
  };
  const getPackages = async () => {
    const res = await axios.get('/saloon/saloonPackages/' + route.params.id);
    setPackages(res.data);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getServices();
    getPackages();
    return () => {};
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="Services"
      tabBarOptions={{
        labelStyle: { fontSize: 14 },
        indicatorStyle: { backgroundColor: colors.white },
        activeTintColor: colors.white,
        inActiveTintColor: colors.lightRed,
        style: { backgroundColor: colors.red },
      }}>
      <Tab.Screen
        name="Services"
        // component={ServicesList}
        options={{
          tabBarLabel: 'Services',
        }}>
        {(props) => (
          <ServicesList {...props} listings={Services} loading={loading} />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Packages"
        // component={PackagesList}
        options={{
          tabBarLabel: 'Packages',
        }}>
        {(props) => (
          <PackagesList {...props} listings={Packages} loading={loading} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flatScreen: {
    flex: 1,
    paddingTop: 10,
  },
  button: {
    backgroundColor: colors.red,
    borderRadius: 30,
    position: 'absolute',
    elevation: 5,
    right: 20,
    bottom: 30,
    padding: 10,
    width: 60,
    height: 60,
  },
  icon: {
    tintColor: colors.white,
    padding: 10,
    width: 40,
    height: 40,
  },
});

export default ServicesListScreen;
