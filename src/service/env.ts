type Environment = {
  API_BASE_URL: string;
  SENTRY_DSN: string;
};

const configs: Record<string, Environment> = {
  development: {
    API_BASE_URL: location.origin,
    SENTRY_DSN: '',
  },
  staging: {
    API_BASE_URL: location.origin,
    SENTRY_DSN: '',
  },
  production: {
    API_BASE_URL: location.origin,
    SENTRY_DSN: '',
  },
};

function getEnv(): Environment {
  const envName = process.env.APP_ENV || 'development';
  const config = configs[envName];
  if (!config) {
    throw new Error(`Retrive config error with env name: ${envName}`);
  }

  return config;
}

export { getEnv };
