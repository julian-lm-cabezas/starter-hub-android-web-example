import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'starter-hub-android-web-example',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
