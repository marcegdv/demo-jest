import axios from 'axios';

const API_URL = 'https://date.nager.at/api/v3';
const API_COUNTRIES = '/AvailableCountries';
const API_COUNTRY_INFO = '/CountryInfo';
const API_HOLY_DAYS = '/publicholidays';

export const getCountries = async () => {
    const url = `${API_URL}${API_COUNTRIES}`;
    return await apiCall(url)
};

export const getCountryInfo = async (countryCode) => {
    const code = validateCountryCode(countryCode)
    const url = `${API_URL}${API_COUNTRY_INFO}/${code}`;
    return await apiCall(url)
};

export const getCountryHolyDays = async (year, countryCode) => {
    const code = validateCountryCode(countryCode);
    const url = `${API_URL}${API_HOLY_DAYS}/${validateYear(year)}/${code}`;
    return await apiCall(url)
};

const validateCountryCode = (countryCode) => {
    if (typeof countryCode !== 'string') { throw new Error(`Country code ${countryCode} invalid.`); }
    return countryCode.toUpperCase();
};

const validateYear = (year) => {
    if (typeof year !== 'number')  { throw new Error(`Year ${year} invalid.`); }
    return year;
};

const apiCall = async (url) => {
    const info = await axios.get(url).catch((error) => {
        throw error;
    })
    return info.data;
};