import type {Config} from 'jest';

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/setuptests.ts'],
  preset: 'react-native',
  testEnvironment: 'jsdom',
  // transform: {
  //   '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  //   '\\.(ts|tsx)$': 'ts-jest',
  // },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
};

export default config;
