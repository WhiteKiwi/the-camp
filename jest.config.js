module.exports = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: 'src',
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	collectCoverageFrom: ['**/*.(t|j)s', '!**/index.ts'],
	coveragePathIgnorePatterns: ['<rootDir>/index.ts'],
	moduleNameMapper: {
		'^@core/(.*)$': '<rootDir>/core/$1',
	},
	coverageDirectory: '../coverage',
	testEnvironment: 'node',
	testTimeout: 60000,
};
