import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

const envVarsSchema: Joi.ObjectSchema = Joi.object({
  SERVER_PORT: Joi.number().default(3000),
  CITIES_SOURCE_URL: Joi.string().required(),
  WEATHER_API_ROOT: Joi.string().required(),
  WEATHER_API_KEY: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_NAME: Joi.string().required(),
});

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = ConfigService.validateInput(config);
  }

  private static validateInput(envConfig: EnvConfig): EnvConfig {
    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get serverPort(): string {
    return String(this.envConfig.SERVER_PORT);
  }

  get weatherApiRoot(): string {
    return String(this.envConfig.WEATHER_API_ROOT);
  }

  get weatherApiKey(): string {
    return String(this.envConfig.WEATHER_API_KEY);
  }

  get dbUser(): string {
    return String(this.envConfig.DB_USER);
  }

  get dbPassword(): string {
    return String(this.envConfig.DB_PASSWORD);
  }

  get dbHost(): string {
    return String(this.envConfig.DB_HOST);
  }

  get dbPort(): number {
    return Number(this.envConfig.DB_PORT);
  }

  get dbName(): string {
    return String(this.envConfig.DB_NAME);
  }

  get citiesSourceUrl(): string {
    return String(this.envConfig.CITIES_SOURCE_URL);
  }
}
