module.exports = {
  preset: 'react-native',
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",



  },

  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|@react-native-community|@react-native-firebase|react-redux|@reduxjs/toolkit|uuid)|@react-native-async-storage/)",
  ],
  setupFiles: [
    './__mocks__/@react-native-async-storage'
  ],
};
