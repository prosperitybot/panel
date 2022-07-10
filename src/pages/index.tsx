import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { GetImageUrl, GetGuilds } from '~/utils/discord';
import Link from 'next/link';
import Image from 'next/image';
import { Guild } from '~/types/discord';

export default function Home() {
	const [cookies] = useCookies(['token']);
	const [guilds, setGuilds] = useState<Guild[]>();

	useEffect(() => {
		if (cookies.token === undefined) {
			window.location.href =
				'https://discord.com/oauth2/authorize?client_id=930157747385798666&scope=identify%20email%20guilds&response_type=code';
		}

		const fetchGuilds = async () => {
			const data = await GetGuilds(cookies.token!);
			setGuilds(data);
		};

		fetchGuilds().catch(console.error);
	}, [cookies.token]);

	if (guilds === undefined) {
		return (
			<div className="flex">
				<div className="m-auto">
					<span className="h-max w-full flex justify-center items-center p-20">
						<span className="animate-spin relative flex h-10 w-10 rounded-sm bg-purple-400 opacity-75"></span>
					</span>
				</div>
			</div>
		);
	} else {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{guilds.map((g) => (
					<div key={g.id}>
						<Link
							href={
								g.bot_present
									? `/settings/${g.id}`
									: 'https://discord.com/oauth2/authorize?client_id=930157747385798666&scope=identify%20email%20guilds&response_type=code'
							}
						>
							<div className="bg-base-100 rounded-box mx-2 grid w-72 flex-shrink-0 place-items-center items-center gap-4 p-4 py-8 shadow-xl cursor-pointer">
								<div className="avatar">
									<div
										className={`mask mask-squircle bg-base-content h-24 w-24 bg-opacity-10 p-px ${
											g.bot_present ? '' : 'grayscale'
										}`}
									>
										<Image
											src={
												g.icon != ''
													? GetImageUrl('icons', g.id, g.icon ?? '')
													: `https://ui-avatars.com/api/?name=${g.name}`
											}
											alt={`${g.name}'s Server Icon`}
											width="100"
											height="100"
											className="mask mask-squircle"
										/>
									</div>
								</div>
								<div className="text-lg font-extrabold text-ellipsis">
									{g.name}
								</div>
								<div className="text-base-content/70 my-3 text-sm">{g.id}</div>
							</div>
						</Link>
					</div>
				))}
			</div>
		);
	}
}
