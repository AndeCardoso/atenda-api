import "dotenv/config";

const dayTrialExpiration = process.env.DAY_TRIAL_EXPIRATION;

export const DAY_TRIAL_EXPIRATION = Number(dayTrialExpiration);
