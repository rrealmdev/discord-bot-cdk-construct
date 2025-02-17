import { SecretsManager } from 'aws-sdk'
import { IDiscordSecrets } from '../../types'
import { discordBotAPIKeyName, discordBotAPIKeyNamePrefix } from '../constants/EnvironmentProps'

const secretsManager = new SecretsManager()

/**
 * Cached Discord secrets so we can reduce warm start times.
 */
let __discordSecrets: IDiscordSecrets | undefined = undefined

/**
 * Gets the Discord secrets (public key, client ID, etc.) for use in our lambdas.
 *
 * @returns {IDiscordSecrets | undefined} The Discord secrets to be used.
 */
export async function getDiscordSecrets(): Promise<IDiscordSecrets | undefined> {
  if (!__discordSecrets) {
    try {
      const discordApiKeys = await secretsManager
        .getSecretValue({
          SecretId: discordBotAPIKeyName,
        })
        .promise()
      if (discordApiKeys.SecretString) {
        __discordSecrets = JSON.parse(discordApiKeys.SecretString)
      }
    } catch (exception) {
      console.log(`Unable to get Discord secrets: ${exception}`)
    }
  }
  return __discordSecrets
}

export async function getDiscordSecretsById(discordApplicationId: string): Promise<IDiscordSecrets | undefined> {
  if (!__discordSecrets) {
    try {
      const discordApiKeys = await secretsManager
        .getSecretValue({
          SecretId: `${discordBotAPIKeyNamePrefix}${discordApplicationId}`,
        })
        .promise()
      if (discordApiKeys.SecretString) {
        __discordSecrets = JSON.parse(discordApiKeys.SecretString)
      }
    } catch (exception) {
      console.log(`Unable to get Discord secrets by id: ${discordApplicationId}: ${exception}`)
    }
  }
  return __discordSecrets
}
