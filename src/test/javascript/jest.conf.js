const tsconfig = require('../../../tsconfig.json');

module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  rootDir: '../../../',
  testURL: 'http://localhost/',
  cacheDirectory: '<rootDir>/build/jest-cache',
  coverageDirectory: '<rootDir>/build/test-results/',
  testMatch: ['<rootDir>/src/test/javascript/spec/**/@(*.)@(spec.ts?(x))'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/test/javascript'
  ],
  moduleNameMapper: mapTypescriptAliasToJestAlias({
    '\\.(css|scss)$': 'identity-obj-proxy'
  }),
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: './build/test-results/', outputName: 'TESTS-results-jest.xml' }]
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/'
  ],
  setupFiles: [
    '<rootDir>/src/test/javascript/spec/enzyme-setup.ts',
    '<rootDir>/src/test/javascript/spec/storage-mock.ts'
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json',
      diagnostics: false
    }
  }
};

function mapTypescriptAliasToJestAlias(alias = {}) {
  const jestAliases = { ...alias };
  if (!tsconfig.compilerOptions.paths) {
    return jestAliases;
  }
  Object.entries(tsconfig.compilerOptions.paths)
    .filter(([key, value]) => {
      // use Typescript alias in Jest only if this has value
      if (value.length) {
        return true;
      }
      return false;
    })
    .map(([key, value]) => {
      // if Typescript alias ends with /* then in Jest:
      // - alias key must end with /(.*)
      // - alias value must end with /$1
      const regexToReplace = /(.*)\/\*$/;
      const aliasKey = key.replace(regexToReplace, '$1/(.*)');
      const aliasValue = value[0].replace(regexToReplace, '$1/$$1');
      return [aliasKey, `<rootDir>/${aliasValue}`];
    })
    .reduce((aliases, [key, value]) => {
      aliases[key] = value;
      return aliases;
    }, jestAliases);
  return jestAliases;
}
