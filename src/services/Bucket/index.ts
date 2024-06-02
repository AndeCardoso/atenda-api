import { bucketConfig } from "@config/bucket";
import { common, objectstorage } from "oci-sdk";

export const provider = new common.ConfigFileAuthenticationDetailsProvider();

export const client = new objectstorage.ObjectStorageClient({
  authenticationDetailsProvider: provider,
});

export const namespace = bucketConfig.namespace!!;
export const bucketName = bucketConfig.bucket!!;
