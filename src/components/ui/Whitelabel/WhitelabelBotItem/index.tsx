import Image from 'next/image';
import { useState } from 'react';
import { WhitelabelBot } from '~/types/whitelabel';
import { GetImageUrl } from '~/utils/discord';

export interface Props {
	bot: WhitelabelBot;
}

export function WhitelabelBotItem({ bot }: Props) {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	return (
		<div className="container mx-auto w-full bg-base-300 p-5 rounded-lg">
			<div className="grid gap-4 grid-cols-3">
				<div className="flex items-center space-x-2 pb-3">
					<div className="dropdown">
						<div tabIndex={0}>
							<div className="avatar">
								<div className="mask mask-hexagon bg-base-content h-16 w-16 bg-opacity-10 p-px">
									<Image
										src={
											bot.botAvatarHash != ''
												? GetImageUrl('avatars', bot.botId, bot.botAvatarHash)
												: `https://ui-avatars.com/api/?name=${bot.botName}`
										}
										alt={`${bot.botName}#${bot.botDiscrim}'s Avatar`}
										className="mask mask-hexagon"
										width="64"
										height="64"
									/>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className="text-lg font-extrabold">{`${bot.botName}#${bot.botDiscrim}`}</div>
						<div className="text-base-content/70 text-sm">{bot.botId}</div>
					</div>
				</div>
				<div></div>
				<div>
					<button
						className="btn btn-outline btn-error w-full"
						onClick={() => setIsDeleteModalOpen(true)}
					>
						Delete
					</button>
					<input
						type="checkbox"
						id="deleteModal"
						className="modal-toggle"
						checked={isDeleteModalOpen}
						readOnly={true}
					/>
					<div className="modal">
						<div className="modal-box relative">
							<label
								htmlFor="createCommunityModal"
								className="btn btn-sm btn-circle absolute right-2 top-2"
								onClick={() => setIsDeleteModalOpen(false)}
							>
								✕
							</label>
							<h2 className="text-lg pb-5">
								Delete Whitelabel Bot{' '}
								<span className="font-bold">
									{bot.botName}#{bot.botDiscrim}
								</span>
								?
							</h2>
							<div className="alert alert-warning shadow-lg">
								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="stroke-current flex-shrink-0 h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
										/>
									</svg>
									<span>
										This will shut down the bot and remove it from the
										whitelabel list.
									</span>
								</div>
							</div>
							<div className="p-5 modal-action">
								<button className="btn btn-error">Delete Bot</button>
								<button
									className="btn"
									onClick={() => setIsDeleteModalOpen(false)}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="text-lg font-bold pb-1">Settings</div>
			<div className="grid gap-4 grid-cols-2 pb-5">
				<div>
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Status Type</span>
						</label>
						<select className="select">
							<option disabled value={bot.statusType}>
								Select a role
							</option>
							<option value="PLAYING">PLAYING</option>
							<option value="STREAMING">STREAMING</option>
							<option value="LISTENING">LISTENING</option>
							<option value="WATCHING">WATCHING</option>
						</select>
					</div>
				</div>
				<div>
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Status Content</span>
						</label>
						<input type="text" className="input" value={bot.statusContent} />
					</div>
				</div>
			</div>
			<div className="text-lg font-bold pb-1">Actions</div>
			<div className="grid gap-4 grid-cols-3 pb-10">
				<div>
					<button className="btn btn-outline btn-success w-full">Start</button>
				</div>
				<div>
					<button className="btn btn-outline btn-info w-full">Restart</button>
				</div>
				<div>
					<button className="btn btn-outline btn-error w-full">Stop</button>
				</div>
			</div>
		</div>
	);
}
