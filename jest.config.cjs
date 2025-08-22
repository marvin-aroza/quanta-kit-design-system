module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: 'tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
      },
    ],
  },
  testMatch: [
    '<rootDir>/projects/**/*.spec.ts',
    '<rootDir>/src/**/*.spec.ts'
  ],
  collectCoverageFrom: [
    'projects/quanta-kit/src/lib/**/*.ts',
    '!projects/quanta-kit/src/lib/**/*.stories.ts',
    '!projects/quanta-kit/src/lib/**/*.module.ts',
    '!projects/quanta-kit/src/lib/**/index.ts',
    '!projects/quanta-kit/src/lib/**/*.d.ts'
  ],
  coverageReporters: [
    'html',
    'text',
    'text-summary',
    'lcov'
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 80,
      functions: 85,
      lines: 90
    }
  }
};
