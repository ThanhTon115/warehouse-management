import { config } from 'dotenv'

export default () => {
  const variables = {
    DEMO: process.env.DEMO,
    CONTROLLER_URL: process.env.CONTROLLER_URL,
    APP_NAME: process.env.APP_NAME,
    TIMEOUT: process.env.TIMEOUT || '30000',
    VERSION: process.env.VERSION,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    NAME: process.env.NAME,
    LOCALE: process.env.LOCALE || 'en',
    PHONE_CODE: process.env.PHONE_CODE || '84',
    DATE_FORMAT: 'DD/MM/YYYY',
    DATE_TIME_FORMAT: 'DD/MM/YYYY HH:mm',
    DEFAULT_ROLE: 'user',
    NOTIFICATION_VENDOR: process.env.NOTIFICATION_VENDOR,
    ONESIGNAL_APP_ID: process.env.ONESIGNAL_APP_ID,
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
    ...(process.env.ENV
      ? process.env.NAME
        ? config({ path: `.env.${process.env.ENV}.${process.env.NAME}` }).parsed
        : config({ path: `.env.${process.env.ENV}` }).parsed
      : process.env.NAME
        ? config({ path: `.env.${process.env.NAME}` }).parsed
        : config().parsed),
  }

  // check required env before build
  // ignore test environment
  if (process.env.TEST === 'true') {
    return variables
  }

  // ;[
  //   // "CONTROLLER_URL",
  //   'FIREBASE_API_KEY',
  //   // "FIREBASE_AUTH_DOMAIN",
  //   // "FIREBASE_PROJECT_ID",
  //   // "FIREBASE_STORAGE_BUCKET",
  //   // "FIREBASE_APP_ID",
  // ].forEach((key) => {
  //   const value = variables[key]

  //   if (!value) {
  //     throw new Error(`Environment ${key} is required`)
  //   }
  // })

  try {
    parseInt(variables.PHONE_CODE)
  } catch {
    throw new Error(`invalid PHONE_CODE number ${variables.PHONE_CODE}`)
  }

  // validate push services
  // switch (variables.NOTIFICATION_VENDOR) {
  //   case "onesignal":
  //     if (!variables.ONESIGNAL_APP_ID) {
  //       throw new Error(`onesignal: ONESIGNAL_APP_ID is required`);
  //     }
  //     if (!uuidValidate(variables.ONESIGNAL_APP_ID)) {
  //       throw new Error(`onesignal: invalid app_id format. Expect uuid`);
  //     }
  //     break;
  //   case "firebase":
  //     if (!variables.FIREBASE_MESSAGING_SENDER_ID) {
  //       throw new Error(`firebase: FIREBASE_MESSAGING_SENDER_ID is required`);
  //     }

  //     if (!variables.FCM_PUBLIC_KEY || variables.FCM_PUBLIC_KEY.length < 64) {
  //       throw new Error(`firebase: FCM_PUBLIC_KEY is invalid`);
  //     }
  //     break;
  // }

  return variables
}
