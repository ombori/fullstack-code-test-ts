const isURL = require('validator/lib/isURL');

const serverEnvsValidationRules = {
  API_HOST: [isURL],
};

function getServerEnvs() {
  const errors = {};
  const envs = {};

  for (const envName in serverEnvsValidationRules) {
    const validationRules = serverEnvsValidationRules[envName];
    const value = process.env[envName];

    const validationResults = validationRules.reduce((acc, curr) => {
      const validationName = curr.name;
      const isValid = curr(value);

      if (!isValid) {
        acc[validationName] = false;
      }

      return acc;
    }, {});

    if (Object.keys(validationResults).length > 0) {
      errors[envName] = { value: value, rules: validationResults };
    } else {
      envs[envName] = value;
    }
  }

  if (Object.keys(errors).length > 0) {
    throw new Error(
      'Failed to load server envs' + '\n' + JSON.stringify(errors, null, 2),
    );
  }

  return envs;
}

module.exports = {
  getServerEnvs,
};
