import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = ConfigService.validateInput(config);
  }

  /**
   * This here is just to ensure all needed variables are set, and
   * returns the validated JavaScript object including the applied
   * default values.
   */
  private static validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      PORT: Joi.number().default(3000),
      WEATHER_API_ROOT: Joi.string().required(),
      WEATHER_API_KEY: Joi.string().required(),
      DB_USER: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_PORT: Joi.string().required(),
      DB_HOST: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
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
}
