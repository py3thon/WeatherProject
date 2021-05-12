import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { colors } from '../utils/index'
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons'
const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.translations = {
	en: {
		riseTime: 'Sunrise Time',
		setTime: 'Sunset Time',
		feelsLike: 'Feels Like',
		maxTemp: 'Max Temp',
		minTemp: 'Min Temp',
		visibility: 'Visibility',
		humidity: 'Humidity',
		windSpeed: 'Wind Speed',
		pressure: 'Pressure'
	},
	cn: {
		riseTime: '日出時間',
		setTime: '日落時間',
		feelsLike: '裸露皮膚感覺溫度',
		maxTemp: '最高溫度',
		minTemp: '最低溫度',
		visibility: '能見度',
		humidity: '濕度',
		windSpeed: '風速',
		pressure: '大氣壓強'
	}
};

i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default function WeatherDetails({ currentWeather, unitSystem, language}) {

	i18n.locale = language;

	const {
		main: { feels_like, humidity, pressure, temp_min, temp_max },
		wind: { speed },
		visibility,
		sys: { sunrise, sunset },
		timezone
	} = currentWeather

	const convertTime = (utc, timezone) => {
		const date = new Date(((utc * 1000) + (timezone * 1000)) - 28800000);
		const timestr = date.toLocaleTimeString('en-US');
		return timestr
	}

	const windSpeed = unitSystem === 'metric' ? `${Math.round(speed)} m/s` : `${Math.round(speed)} miles/hour`

	return (
		<ScrollView>
			<View style={styles.weatherDetailsRow}>
				<View style={styles.weatherDetailsBox}>
					<Feather name="sunrise" size={30} color={PRIMARY_COLOR} />
					<Text style={styles.textSecond}> {i18n.t('riseTime')} : </Text>
				</View>
				<View>
					<Text style={styles.detailText}>{convertTime(sunrise, timezone)}</Text>
					<Text style={styles.line}>─────────────────────────</Text>
				</View>
			</View>
			<View style={styles.weatherDetailsRow}>
				<View style={styles.weatherDetailsBox}>
					<Feather name="sunset" size={30} color={PRIMARY_COLOR} />
					<Text style={styles.textSecond}> {i18n.t('setTime')} : </Text>
				</View>
				<View>
					<Text style={styles.detailText}>{convertTime(sunset, timezone)}</Text>
					<Text style={styles.line}>─────────────────────────</Text>
				</View>
			</View>
			<View style={styles.weatherDetailsRow}>
				<View style={styles.weatherDetailsBox}>
					<Ionicons name="body" size={30} color={PRIMARY_COLOR} />
					<Text style={styles.textSecond}> {i18n.t('feelsLike')} : </Text>
				</View>
				<View>
					<Text style={styles.detailText}>{feels_like}°</Text>
					<Text style={styles.line}>─────────────────────────</Text>
				</View>
			</View>
			<View style={styles.weatherDetailsRow}>
				<View style={styles.weatherDetailsBox}>
					<FontAwesome5 name="temperature-high" size={30} color={PRIMARY_COLOR} />
					<Text style={styles.textSecond}> {i18n.t('maxTemp')} : </Text>
				</View>
				<View>
					<Text style={styles.detailText}>{temp_max}°</Text>
					<Text style={styles.line}>─────────────────────────</Text>
				</View>
			</View>
			<View style={styles.weatherDetailsRow}>
				<View style={styles.weatherDetailsBox}>
					<FontAwesome5 name="temperature-low" size={30} color={PRIMARY_COLOR} />
					<Text style={styles.textSecond}> {i18n.t('minTemp')} : </Text>
				</View>
				<View>
					<Text style={styles.detailText}>{temp_min}°</Text>
					<Text style={styles.line}>─────────────────────────</Text>
				</View>
			</View>
			<View style={styles.weatherDetailsRow}>
				<View style={styles.weatherDetailsBox}>
					<MaterialIcons name="visibility" size={30} color={PRIMARY_COLOR} />
					<Text style={styles.textSecond}> {i18n.t('visibility')} : </Text>
				</View>
				<View>
					<Text style={styles.detailText}>{visibility / 1000} Km</Text>
					<Text style={styles.line}>─────────────────────────</Text>
				</View>
			</View>
			<View>
				<View style={styles.weatherDetailsBox}>
					<MaterialCommunityIcons name="water" size={30} color={PRIMARY_COLOR} />
					<Text style={styles.textSecond}> {i18n.t('humidity')} : </Text>
				</View>
				<View>
					<Text style={styles.detailText}>{humidity}%</Text>
					<Text style={styles.line}>─────────────────────────</Text>
				</View>
			</View>
			<View style={styles.weatherDetailsBox}>
				<MaterialCommunityIcons name="weather-windy" size={30} color={PRIMARY_COLOR} />
				<Text style={styles.textSecond}> {i18n.t('windSpeed')} : </Text>
			</View>
			<View>
				<View>
					<Text style={styles.detailText}>{windSpeed} </Text>
					<Text style={styles.line}>─────────────────────────</Text>
				</View>
			</View>
			<View>
				<View style={styles.weatherDetailsBox}>
					<MaterialCommunityIcons name="speedometer" size={30} color={PRIMARY_COLOR} />
					<Text style={styles.textSecond}> {i18n.t('pressure')} : </Text>
				</View>
				<View>
					<Text style={styles.detailText}>{pressure} hpa</Text>
					<Text style={styles.line}>─────────────────────────</Text>
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	weatherDetails: {
		marginTop: 'auto',
		borderWidth: 1,
		margin: 20,
		borderColor: BORDER_COLOR,
		borderRadius: 0,
	},
	line: {
		color: 'lightgrey',
		margin: 5,
	},

	weatherDetailsBox: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	textSecond: {
		fontSize: 15,
		margin: 1,
		fontWeight: "700",
		color: SECONDARY_COLOR,
	},
	detailText: {
		fontSize: 25,
		marginLeft: 35,
		color: 'dimgray',
	},
})
