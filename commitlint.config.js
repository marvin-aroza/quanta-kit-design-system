const Configuration = {
  /*
   * Resolve and load @commitlint/config-conventional from node_modules.
   * Referenced packages must be installed
   */
  extends: ["@commitlint/config-conventional"],
  /*
   * Resolve and load @commitlint/format from node_modules.
   * Referenced package must be installed
   */
  formatter: "@commitlint/format",
  /*
   * Any rules defined here will override rules from @commitlint/config-conventional
   */
  rules: {
    // Type validation - all standard types for GitHub releases
    "type-enum": [
      2,
      "always",
      [
        "feat",     // A new feature
        "fix",      // A bug fix
        "docs",     // Documentation only changes
        "style",    // Changes that do not affect the meaning of the code
        "refactor", // A code change that neither fixes a bug nor adds a feature
        "perf",     // A code change that improves performance
        "test",     // Adding missing tests or correcting existing tests
        "build",    // Changes that affect the build system or external dependencies
        "ci",       // Changes to our CI configuration files and scripts
        "chore",    // Other changes that don't modify src or test files
        "revert",   // Reverts a previous commit
        "security", // Security improvements
        "deps",     // Dependency updates
        "release"   // Release commits
      ]
    ],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    
    // Scope validation - ticket numbers
    "scope-case": [2, "always", "upper-case"], // For ticket numbers like ABC-123
    "scope-empty": [1, "never"], // Warning instead of error if scope is missing
    
    // Subject validation - lowercase
    "subject-case": [2, "always", "lower-case"],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "subject-max-length": [2, "always", 72],
    "subject-min-length": [2, "always", 3],
    
    // Body validation
    "body-leading-blank": [2, "always"],
    "body-max-line-length": [2, "always", 100],
    
    // Footer validation
    "footer-leading-blank": [2, "always"],
    "footer-max-line-length": [2, "always", 100],
    
    // Header format
    "header-max-length": [2, "always", 100],
    "header-min-length": [2, "always", 10]
  },
  
  /*
   * Functions that return true if commitlint should ignore the given message.
   */
  ignores: [
    (commit) => commit === "",
    (commit) => commit.includes("chore(release):"), // Ignore changeset release commits
    (commit) => commit.includes("Version Packages") // Ignore changeset version commits
  ],
  
  /*
   * Whether commitlint uses the default ignore rules.
   */
  defaultIgnores: true,
  
  /*
   * Custom URL to show upon failure
   */
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint'
};

module.exports = Configuration;
