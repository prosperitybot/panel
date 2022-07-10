import { useCookies } from 'react-cookie';
import { GetCurrentUser } from '~/utils/discord';
import { useEffect, useState } from 'react';
import { APIUser } from 'discord-api-types/v10';
import Link from 'next/link';
import { ProfileMenu } from '../ui/Navigation/ProfileMenu';
import { NavigationItem } from '../ui/NavigationItem';

export function Navigation() {
	const [cookies] = useCookies(['token']);
	const [userInfo, setUserInfo] = useState<APIUser>();

	useEffect(() => {
		if (cookies.token === undefined) return;

		const fetchUserInfo = async () => {
			const data = await GetCurrentUser(cookies.token!);
			setUserInfo(data);
		};

		fetchUserInfo().catch(console.error);
	}, [cookies.token]);

	return (
		<div className="navbar bg-base-100 drop-shadow">
			<div className="flex-1">
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</label>
				</div>
				<a className="btn btn-ghost normal-case text-xl">Prosperity Bot</a>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal p-0 pr-10">
					<NavigationItem link="/" label="Home" />
				</ul>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal p-0 pr-1">
					<Link href="https://discord.gg/S5sN8HH">
						<button className="btn btn-primary">Join Support Server</button>
					</Link>
				</ul>
			</div>
			<ProfileMenu user={userInfo} />
		</div>
	);
}
