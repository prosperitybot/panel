import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const instance = axios.create({
	baseURL: publicRuntimeConfig.backendUrl,
});
