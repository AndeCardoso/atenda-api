import "dotenv/config";

const region = process.env.OC_REGION;
const user = process.env.OC_USER;
const fingerprint = process.env.OC_FINGERPRINT;
const key_file = process.env.OC_KEY_FILE;
const tenancy = process.env.OC_TENANCY;
const bucket = process.env.OC_BUCKET;
const namespace = process.env.OC_NAMESPACE;

export const bucketConfig = {
  region: region!!,
  user: user!!,
  fingerprint: fingerprint!!,
  key_file: key_file!!,
  tenancy: tenancy!!,
  bucket: bucket!!,
  namespace: namespace!!,
};
