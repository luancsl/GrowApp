import { Platform, NativeModules } from 'react-native';

// Função responsável por adquirir o idioma utilizado no device
export default () => {
    return Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale // Adquire o idioma no device iOS
        : NativeModules.I18nManager.localeIdentifier // Adquire o idioma no device Android
}
