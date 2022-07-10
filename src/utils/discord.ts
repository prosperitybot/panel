import axios from 'axios';
import { instance } from '~/utils/axios';
import { APIUser } from 'discord-api-types/v10';
import { Channel, Guild } from '~/types/discord';

export async function GetCurrentUser(token: string): Promise<APIUser> {
	const result = await axios.get('https://discord.com/api/v10/users/@me', {
		headers: { Authorization: 'Bearer ' + token },
	});
	const data: APIUser = result.data;
	return data;
}

export async function GetGuilds(token: string): Promise<Guild[]> {
	const result = await instance.get('/api/v1/guilds', {
		headers: { Authorization: 'Bearer ' + token },
	});
	const data: Guild[] = result.data;
	return data;
}

export async function GetGuildById(token: string, guildId: string): Promise<Guild> {
	const result = await instance.get(`/api/v1/guilds/${guildId}`, {
		headers: { Authorization: 'Bearer ' + token },
	});
	const data: Guild = result.data;
	return data;
}

export async function GetGuildChannelsByGuildId(token: string, guildId: string): Promise<Channel[]> {
	const result = await instance.get(`/api/v1/guilds/${guildId}/channels`, {
		headers: { Authorization: 'Bearer ' + token },
	});
	const data: Channel[] = result.data;
	return data;
}

export function GetImageUrl(type: string, id: string, hash: string): string {
	return `https://cdn.discordapp.com/${type}/${id}/${hash}.${
		hash.startsWith('a_') ? 'gif' : 'webp'
	}`;
}