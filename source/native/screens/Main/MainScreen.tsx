import React, {useCallback, useEffect} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamsList} from '../../navigation/stacks/HomeStack';
import {Routes} from '../../navigation/routes';

const styles = StyleSheet.create({
  container: {flex: 1},
});

interface IProps {
  navigation: StackNavigationProp<HomeStackParamsList, Routes.MainScreen>;
}

const MainScreen: React.FC<IProps> = () => {
  const onRefresh = () => {};

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }>
        <View />
      </ScrollView>
    </View>
  );
};

export {MainScreen};
