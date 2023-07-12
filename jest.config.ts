import type {Config} from 'jest';

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/setuptests.ts'],
  preset: 'react-native',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
};

export default config;
