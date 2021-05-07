import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TextInput, useColorScheme } from 'react-native';
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo'
import UnitsPicker from './components/UnitsPicker'
import ReloadIcon from './components/ReloadIcon'
import { colors } from './utils/index'
import WeatherDetails from './components/WeatherDetails'

const WEATHER_API_KEY = 'f51934130452d9c3e07bd32cfb0f95ff'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'
export default function App() {

  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitSystem, setUnitSystem] = useState('metric')
  const [value, onChangeText] = useState('')
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
          setErrorMessage("Acces to loaction is needed to run this app")
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
          onChangeText('')
        } else {
          setErrorMessage(result.message)
        }
      } catch (error) {
      }
    }
  }

  if (currentWeather) {

    return (
      <View style={styles.container, themeContainerStyle}>
        <StatusBar style="auto" />
        <TextInput style={{ textAlign: 'center', backgroundColor: 'lightgrey', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderTopRightRadius: 5, borderTopLeftRadius: 5, height: 25, width: 300, marginTop: 50, borderColor: 'gray', borderWidth: 0 }} onChangeText={text => onChangeText(text)}
          value={value} placeholder={'Enter a place...'}
          onSubmitEditing={load} />
        <View style={styles.main}>
          <UnitsPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
          <WeatherInfo currentWeather={currentWeather} />
          <ReloadIcon load={load} />
        </View>
        <Text style={styles.line}>──────────────────────────</Text>
        <ScrollView contentContainerStyle={styles.container}>
          <WeatherDetails currentWeather={currentWeather} unitSystem={unitSystem} />
        </ScrollView>

      </View>


    )
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>{errorMessage}</Text>
        <StatusBar style="auto" />
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
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  main: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30
  },
  line: {
    color: 'lightgray',
    paddingTop: 10,
    marginBottom: 0
  },
  body: {
    position: 'relative',
    marginTop: 20
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
});
