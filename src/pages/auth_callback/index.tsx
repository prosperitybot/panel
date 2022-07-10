import { RESTPostOAuth2AccessTokenResult } from 'discord-api-types/v10';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { instance } from '~/utils/axios';

export default function AuthCallback() {
	const router = useRouter();
	const [cookie, setCookie] = useCookies(['token']);
	useEffect(() => {
		if (!router.isReady) return;

		const exchangeRequest = async () => {
			const { code } = router.query;
			instance
				.get<RESTPostOAuth2AccessTokenResult>(`/exchange?code=${code}`)
				.then((exchange) => {
					const expiry = new Date();
					expiry.setSeconds(expiry.getSeconds() + exchange.data.expires_in);
					setCookie('token', exchange.data.access_token, {
						expires: expiry,
					});
				});
		};

		exchangeRequest().catch(console.error);
	}, [router.isReady, router.query, setCookie]);

	return <></>;
}
