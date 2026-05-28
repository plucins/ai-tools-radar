import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  FRONTEND_ORIGIN: Joi.string().uri().default('http://localhost:5173'),
  OLLAMA_BASE_URL: Joi.string().uri().default('http://localhost:11434'),
  OLLAMA_MODEL: Joi.string().allow('').default('llama3'),
  OLLAMA_API_KEY: Joi.string().allow('').default(''),
  OLLAMA_TIMEOUT_MS: Joi.number().default(120000),
  LLM_MODE: Joi.string().valid('mock', 'ollama').default('mock'),
  LOGO_DEV_PK: Joi.string().allow('').default(''),
  COMPARISONS_DIR: Joi.string().default('./data/comparisons'),
});
