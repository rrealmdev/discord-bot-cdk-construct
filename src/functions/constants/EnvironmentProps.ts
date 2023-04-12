/**
 * The name of the secret key to retrieve.
 */
export const discordBotAPIKeyName = process.env['DISCORD_BOT_API_KEY_NAME'] ?? 'apiKeyName'
/**
 * The prefix for the name of the secret key to retrieve.
 */
export const discordBotAPIKeyNamePrefix = process.env['DISCORD_BOT_API_KEY_PREFIX'] ?? 'discord-api-key-for-app-'
/**
 * The ARN for the Discord command lambda.
 */
export const commandLambdaARN = process.env['COMMAND_LAMBDA_ARN'] ?? 'commandLambdaARN'
