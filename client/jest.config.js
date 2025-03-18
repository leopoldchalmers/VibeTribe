/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jest-fixed-jsdom",
    transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg",
    '\\.(jpg|jpeg|png|webp)$': '<rootDir>/__mocks__/fileMock.js',
  },
};
