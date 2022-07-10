import { APIUser } from 'discord-api-types/v10';
import Image from 'next/image';
import Link from 'next/link';
import { GetImageUrl } from '~/utils/discord';
import { NavigationItem } from '../../NavigationItem';

export interface Props {
	user: APIUser | undefined;
}

export function ProfileMenu({ user }: Props) {
	if (user === undefined) {
		return (
			<Link href="https://discord.com/oauth2/authorize?client_id=930157747385798666&scope=identify%20email%20guilds&response_type=code">
				<div className="navbar-end">
					<a className="btn">Login</a>
				</div>
			</Link>
		);
	}

	return (
		<div className="flex-none gap-2">
			<div className="dropdown dropdown-end">
				<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
					<div className="w-10 rounded-full">
						<Image
							src={GetImageUrl('avatars', user?.id ?? '', user?.avatar ?? '')}
							alt={`${user?.username}#${user?.discriminator}'s Profile Picture`}
							width="64"
							height="64"
						/>
					</div>
				</label>
				<ul
					tabIndex={0}
					className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
				>
					<div className="py-3 px-4">
						<span className="block text-sm text-gray-900 dark:text-white">
							{user?.username}#{user?.discriminator}
						</span>
						<span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
							{user?.id}
						</span>
					</div>
					<NavigationItem link="/whitelabel" label="Whitelabel" />
					<NavigationItem link="/logout" label="Logout" />
				</ul>
			</div>
		</div>
	);
}
