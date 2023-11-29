import type { Config } from 'jest'

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    collectCoverage: true,
    moduleFileExtensions: ['js', 'ts',],
    verbose: true
}

/* eslint-disable-next-line import/no-default-export */
export default config