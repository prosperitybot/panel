import { WhitelabelBot } from '~/types/whitelabel';
import { instance } from '~/utils/axios';

export async function GetPaymentUrl(token: string): Promise<string> {
	const result = await instance.get('/api/v1/payments/checkout?quantity=1', {
		headers: { Authorization: 'Bearer ' + token },
	});
	const data = result.data;
	return data.url;
}

export async function GetPortalUrl(token: string): Promise<string> {
	const result = await instance.get('/api/v1/payments/portal', {
		headers: { Authorization: 'Bearer ' + token },
	});
	const data = result.data;
	return data.url;
}

export async function GetSubscription(token: string): Promise<any> {
	const result = await instance.get('/api/v1/payments/subscription', {
		headers: { Authorization: 'Bearer ' + token },
	});
	const data = result.data;
	return data;
}

export async function GetBots(token: string): Promise<WhitelabelBot[]> {
	const result = await instance.get('/api/v1/whitelabel/bots', {
		headers: { Authorization: 'Bearer ' + token },
	});
	const data = result.data;
	return data;
}

export async function GetInvoices(token: string): Promise<any> {
	const result = await instance.get('/api/v1/payments/invoices', {
		headers: { Authorization: 'Bearer ' + token },
	});
	const data = result.data;
	return data;
}