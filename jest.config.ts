import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['**/tests/unit/**/*.spec.ts'],
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.ts$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts']
};

export default config;
