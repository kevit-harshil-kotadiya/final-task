/** @type {import('ts-jest').JestConfigWithTsJest} */
// export const preset = 'ts-jest'
// export const testEnvironment = 'node'
// export const clearMocks = true
// export const coverageProvider = 'v8'
// export const moduleFileExtensions = ['js', 'jsx', 'ts', 'tsx', 'json', 'node']
// export const roots = ['FINAL-TASK/src']
// export const testMatch = [
//     '**/__tests__/**/*.[jt]s?(x)',
//     '**/?(*.)+(spec|test).[tj]s?(x)',
// ]
// export const transform = {
//     '^.+\\.(ts|tsx)$': 'ts-jest',
// }
////////////////////////////////////////////////////////////////////////
// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'node',
//     clearMocks: true,
//     coverageProvider: 'v8',
//     moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],

//     roots: [],

//     testMatch: [
//         '**/__tests__/**/*.[jt]s?(x)',
//         '**/?(*.)+(spec|test).[tj]s?(x)',
//     ],
//     transform: {
//         '^.+\\.(ts|tsx)$': 'ts-jest',
//     },
// }
///////////////////////////////////////////////////////////////////////////////
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  // transformIgnorePatterns: [
  //     // By default, ignore files in node_ modules
  //     '/home/kevit/Desktop/VSCODE/node-original/my/Final-Task/__tests__/user.test.ts',
  // ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testTimeout: 10000,
  maxWorkers: 1,
};
