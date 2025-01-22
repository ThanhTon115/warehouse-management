export type AppMode = 'ssr' | 'spa' | 'wpa' | 'bex' | 'cordova' | 'capacitor' | 'electron'

export type PushVendor = 'onesignal' | 'fcm'
export type VideoCallVendor = 'stringee' | 'twilio'

export const Config = {
  controllerURL: process.env.CONTROLLER_URL,
  appName: process.env.APP_NAME,
  version: process.env.VERSION,
  debug: process.env.NODE_ENV !== 'production',
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  },
  locale: 'vi',
  mode: process.env.MODE as AppMode,
  isProd: !!process.env.PROD,
  isDemo: !process.env.PROD || process.env.DEMO === 'true',
  isServer: process.env.MODE === 'ssr' && process.env.SERVER,
  notificationVendor: process.env.NOTIFICATION_VENDOR as PushVendor,
  oneSignalAppId: process.env.ONESIGNAL_APP_ID,
  fcmPublicKey: process.env.FCM_PUBLIC_KEY,
  deviceType: process.env.MODE === 'electron' ? 'electron' : 'browser',
  phoneCode: parseInt(process.env.PHONE_CODE || '84'),
  timeout: parseInt(process.env.TIMEOUT || '30'),
  videoCallVendor: process.env.VIDEO_CALL_VENDOR,
  googleMapAPIKey: process.env.GOOGLE_MAP_API_KEY,
  sentryDSN: process.env.SENTRY_DSN,
  sentryTracingOrigins: (process.env.SENTRY_TRACING_ORIGIN || '').split(','),
  dateFormat: process.env.DATE_FORMAT,
  dateTimeFormat: process.env.DATE_TIME_FORMAT,
  defaultRole: process.env.DEFAULT_ROLE,
}
