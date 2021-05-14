import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TextInput, useColorScheme, RefreshControl } from 'react-native';
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo'
import UnitsPicker from './components/UnitsPicker'
import ReloadIcon from './components/ReloadIcon'
import { colors } from './utils/index'
import WeatherDetails from './components/WeatherDetails'
import LanguagePicker from './components/LanguagePicker'

const WEATHER_API_KEY = 'f51934130452d9c3e07bd32cfb0f95ff'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeTextStyle =
    colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;

  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitSystem, setUnitSystem] = useState('metric')
  const [value, onChangeText] = useState('')
  const [language, setLanguage] = useState('en')

  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    onChangeText(value)
    load();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    load()
  }, [unitSystem])

  async function load() {
    setCurrentWeather(null)
    setErrorMessage(null)
    if (value == '') {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
          setErrorMessage("Access to loaction is needed to run this app")
          return
        }
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation
        })

        const { latitude, longitude } = location.coords

        const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}`

        const response = await fetch(weatherUrl)

        const result = await response.json()

        if (response.ok) {
          setCurrentWeather(result)
        } else {
          setErrorMessage(result.message)
        }
      } catch (error) {
      }
    }
    else {
      try {
        const weatherUrl = `${BASE_WEATHER_URL}q=${value}&units=${unitSystem}&appid=${WEATHER_API_KEY}`
        const response = await fetch(weatherUrl)
        const result = await response.json()
        if (response.ok) {
          setCurrentWeather(result)
        } else {
          setErrorMessage(result.message)
          onChangeText('')
        }
      } catch (error) {
      }
    }
  }

  if (currentWeather) {
    function tranmit(text) {
      onChangeText(text)
    }
    return (
      <View style={styles.container, themeContainerStyle}>
        <ScrollView contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          <StatusBar style="auto" />
          <TextInput style={themeTextStyle}
            onChangeText={text => tranmit(text)}
            value={value}
            placeholder={'Enter a place...'}
            onSubmitEditing={load}
          />
          <View style={styles.main}>
            <View >
              <UnitsPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
            </View>
            <WeatherInfo currentWeather={currentWeather} />
            <View>
              <LanguagePicker language={language} setLanguage={setLanguage} />
              <ReloadIcon load={load} />
            </View>
          </View>
          <Text style={styles.line}>──────────────────────────</Text>
          <ScrollView contentContainerStyle={styles.container}>
            <WeatherDetails currentWeather={currentWeather} unitSystem={unitSystem} language={language} />
          </ScrollView>
        </ScrollView>
      </View>
    )
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>{errorMessage}</Text>
        <ReloadIcon load={load} />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flexDirection: 'row',
    marginTop: 30,
  },
  line: {
    color: 'lightgray',
    paddingTop: 10,
    marginBottom: 0,
  },
  body: {
    position: 'relative',
    marginTop: 20,
  },
  lightContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#242c40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightThemeText: {
    textAlign: 'center',
    backgroundColor: 'lightgrey',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    height: 25,
    width: 300,
    marginTop: 50,
    borderColor: 'gray',
    borderWidth: 0,
  },
  darkThemeText: {
    textAlign: 'center',
    backgroundColor: 'purple',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    height: 25,
    width: 300,
    marginTop: 50,
    borderColor: 'gray',
    borderWidth: 0,
  },
});
