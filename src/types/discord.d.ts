import { APIGuild, APIGuildChannel, TextChannelType } from 'discord-api-types/v10';

export interface Guild extends APIGuild {
    bot_present: boolean;
}

export interface Channel extends APIGuildChannel<TextChannelType> {
    children: Channel[];
}