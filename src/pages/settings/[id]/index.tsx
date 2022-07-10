import {
	APIGuild,
} from 'discord-api-types/v10';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Channel } from '~/types/discord';
import {
	GetGuildById,
	GetGuildChannelsByGuildId,
} from '~/utils/discord';

export default function GuildSettings() {
	const router = useRouter();
	const [cookies] = useCookies(['token']);
	const [guild, setGuild] = useState<APIGuild>();
	const [guildChannels, setGuildChannels] = useState<Channel[]>();
	const { id: guildId } = router.query;

	useEffect(() => {
		if (!router.isReady) return;
		if (cookies.token === undefined) {
			window.location.href =
				'https://discord.com/oauth2/authorize?client_id=930157747385798666&scope=identify%20email%20guilds&response_type=code';
		}

		const fetchGuild = async () => {
			const data = await GetGuildById(cookies.token!, guildId as string);
			setGuild(data);
		};

		const fetchGuildChannels = async () => {
			const data = await GetGuildChannelsByGuildId(
				cookies.token!,
				guildId as string,
			);
			setGuildChannels(data);
		};

		fetchGuild().catch(console.error);
		fetchGuildChannels().catch(console.error);
	}, [cookies.token, router.isReady, guildId]);

	// useEffect(() => {

	// }, [])

	const [notificationType, setNotificationType] = useState('disable');
	const [notificationChannel, setNotificationChannel] = useState('');

	useEffect(() => {}, [notificationType]);

	return (
		<div className="container mx-auto w-full md:w-4/5 lg:w-3/5 xl:w-3/5 bg-base-200">
			<div className="content p-10">
				<div className="header">
					<div className="pb-10">
						<div className="text-4xl font-semibold">Guild Settings</div>
						<div className="text-xl text-gray-500">
							Manage settings for {guild?.name}
						</div>
					</div>
				</div>
				<div className="pb-10">
					<div className="text-2xl font-semibold pb-3">Notifications</div>
					<div className="grid gap-4 grid-cols-2 pb-5">
						<div>
							<div className="form-control w-full max-w-xs">
								<label className="label">
									<span className="label-text">Notification Type</span>
								</label>
								<select
									className="select"
									defaultValue={notificationType}
									onChange={(e) => setNotificationType(e.currentTarget.value)}
								>
									<option value="reply">Reply to message</option>
									<option value="channel">Choose a Channel</option>
									<option value="dm">Direct Messages</option>
									<option value="disable">Disabled</option>
								</select>
							</div>
						</div>
						<div>
							<div
								className={`form-control w-full max-w-xs ${
									notificationType != 'channel' && 'hidden'
								}`}
							>
								<label className="label">
									<span className="label-text">Notification Channel</span>
								</label>
								<select
									className="select"
									defaultValue={notificationChannel}
									onChange={(e) =>
										setNotificationChannel(e.currentTarget.value)
									}
								>
									{guildChannels
										?.sort((a, b) =>
											(a.position ?? 0) > (b.position ?? 0) ? 1 : -1,
										)
										.map((category) => (
											<optgroup key={category.id} label={category.name}>
												{category.children.map((channel) => (
													<option key={channel.id} value={channel.id}>
														#{channel.name}
													</option>
												))}
											</optgroup>
										))}
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
