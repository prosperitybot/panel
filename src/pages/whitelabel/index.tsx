import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { WhitelabelBotItem } from '~/components/ui/Whitelabel/WhitelabelBotItem';
import { WhitelabelBot } from '~/types/whitelabel';
import {
	GetBots,
	GetInvoices,
	GetPaymentUrl,
	GetPortalUrl,
	GetSubscription,
} from '~/utils/stripe';

function YourSubscription(subscription: any) {
	if (subscription == null) {
		return (
			<>
				<div className="text-2xl font-semibold pb-3">Your Subscription</div>
				<span className="text-xl text-gray-500">
					You do not have an active subscription.
				</span>
			</>
		);
	} else {
		return (
			<>
				<div className="text-2xl font-semibold pb-3">
					Your Subscription{' '}
					<span className="text-xl text-gray-500">
						({subscription?.quantity}x Whitelabel License)
					</span>
				</div>
				<div className="text-lg">
					<p>
						<span className="font-bold">Subscribed:</span>{' '}
						{subscription?.first_payment}
					</p>
					<p>
						<span className="font-bold">Next Payment:</span>{' '}
						{subscription?.next_payment}
					</p>
				</div>
			</>
		);
	}
}

function WhitelabelBots(bots: WhitelabelBot[], totalQuantity: number) {
	const [selected, setSelected] = useState('0');
	const [selectedBot, setSelectedBot] = useState<WhitelabelBot>();

	useEffect(() => {
		setSelectedBot(bots.find((bot) => bot.botId === selected));
	}, [selected, bots]);

	if (totalQuantity > 0) {
		return (
			<>
				<div className="divider"></div>
				<div className="text-2xl font-semibold pb-3">Whitelabel Bots</div>
				<div className="grid gap-4 grid-cols-2 pb-2">
					<select
						className="select w-full max-w-xs"
						defaultValue={selected}
						onChange={(e) => setSelected(e.currentTarget.value)}
					>
						<option disabled value="0">
							Configure Whitelabel bot...
						</option>
						{bots.map((bot, i) => (
							<option key={bot.botId} value={bot.botId}>
								Configure Bot #{i + 1}
							</option>
						))}
						{[...Array(totalQuantity - bots.length)].map((x, i) => (
							<option key={bots.length + i + 1} value={bots.length + i + 1}>
								Create Bot #{bots.length + i + 1}
							</option>
						))}
					</select>
				</div>
				{selectedBot != null ? <WhitelabelBotItem bot={selectedBot} /> : null}
			</>
		);
	}
}

export default function Whitelabel() {
	const [cookies] = useCookies(['token']);
	const [invoices, setInvoices] = useState<any>(null);
	const [subscription, setSubscription] = useState<any>(null);
	const [newSubscriptionUrl, setNewSubscriptionUrl] = useState('');
	const [manageSubscriptionUrl, setManageSubscriptionUrl] = useState('');
	const [bots, setBots] = useState<WhitelabelBot[]>([]);
	const router = useRouter();

	useEffect(() => {
		if (newSubscriptionUrl === '') return;
		window.location.href = newSubscriptionUrl;
	}, [newSubscriptionUrl]);

	useEffect(() => {
		if (manageSubscriptionUrl === '') return;
		window.location.href = manageSubscriptionUrl;
	}, [manageSubscriptionUrl]);

	useEffect(() => {
		const getInvoices = async () => {
			const data = await GetInvoices(cookies.token!);
			return data;
		};
		getInvoices().then((data) => {
			setInvoices(data);
		});
	}, [cookies.token]);

	useEffect(() => {
		const getSubscription = async () => {
			const data = await GetSubscription(cookies.token!);
			return data;
		};
		getSubscription().then((data) => {
			setSubscription(data);
		});
	}, [cookies.token]);

	useEffect(() => {
		const getBots = async () => {
			const data = await GetBots(cookies.token!);
			return data;
		};
		getBots().then((data) => {
			setBots(data);
		});
	}, [cookies.token]);

	useEffect(() => {
		if (!router.isReady) return;

		const { result } = router.query;

		if (result === 'success') {
			toast.success('Subscription updated successfully');
		}
		if (result === 'cancel') {
			toast.error('Subscription cancelled');
		}
	}, [router.isReady, router.query]);

	const getPaymentUrl = async () => {
		toast.success('Redirecting you to checkout...');
		const url = await GetPaymentUrl(cookies.token!);
		setNewSubscriptionUrl(url);
	};

	const getPortalUrl = async () => {
		toast.success('Redirecting you to subscription management...');
		const url = await GetPortalUrl(cookies.token!);
		setManageSubscriptionUrl(url);
	};

	return (
		<div className="container mx-auto w-full md:w-4/5 lg:w-3/5 xl:w-3/5 bg-base-200">
			<div className="content p-10">
				<div className="pb-10">
					<div className="text-4xl font-semibold">Whitelabel</div>
					<div className="text-xl text-gray-500">
						Manage your whitelabel subscription & settings
					</div>
				</div>
				<div className="pb-10">
					<div className="text-2xl font-semibold pb-3">
						Subscription Actions
					</div>
					<div className="grid gap-4 grid-cols-3">
						<button
							className="btn btn-outline btn-success"
							onClick={getPaymentUrl}
							disabled={subscription != null}
						>
							Add Subscription
						</button>
						<button
							className={`btn btn-outline btn-info ${
								invoices == null && 'loading'
							}`}
							disabled={subscription == null}
						>
							{invoices === null ? 'Loading Invoices...' : 'View Invoices'}
						</button>
						<button
							className="btn btn-outline btn-error"
							onClick={getPortalUrl}
							disabled={subscription == null}
						>
							Manage Subscription
						</button>
					</div>
				</div>
				<div>{YourSubscription(subscription)}</div>
				<div>{WhitelabelBots(bots, subscription?.quantity ?? 0)}</div>
			</div>
		</div>
	);
}
