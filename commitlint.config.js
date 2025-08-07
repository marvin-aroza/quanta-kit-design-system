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
    "scope-empty": [2, "never"], // Error if scope is missing
    
    // Subject validation - lowercase
    "subject-case": [2, "always", "lower-case"],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "subject-max-length": [2, "always", 72],
    "subject-min-length": [2, "always", 3],
    
    // Body validation
    "body-leading-blank": [2, "always"], // Blank line before body
    "body-empty": [0, "never"], // Optional body
    "body-max-line-length": [2, "always", 100],
    "body-case": [1, "always", "sentence-case"],
    
    // Footer validation
    "footer-leading-blank": [2, "always"], // Blank line before footer
    "footer-empty": [0, "never"], // Optional footer
    "footer-max-line-length": [2, "always", 100],
    
    // Header validation
    "header-max-length": [2, "always", 100],
    "header-min-length": [2, "always", 10]
  },
  /*
   * Array of functions that return true if commitlint should ignore the given message.
   * Given array is merged with predefined functions, which consist of matchers like:
   *
   * - 'Merge pull request', 'Merge X into Y' or 'Merge branch X'
   * - 'Revert X'
   * - 'v1.2.3' (ie semver matcher)
   * - 'Automatic merge X' or 'Auto-merged X into Y'
   *
   * To see full list, check https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/is-ignored/src/defaults.ts.
   * To disable those ignores and run rules always, set `defaultIgnores: false` as shown below.
   */
  ignores: [(commit) => commit === ""],
  /*
   * Whether commitlint uses the default ignore rules, see the description above.
   */
  defaultIgnores: true,
  /*
   * Custom URL to show upon failure
   */
  helpUrl:
    "https://www.conventionalcommits.org/en/v1.0.0/ - Expected format: type(scope): subject",
  /*
   * Custom prompt configs
   */
  prompt: {
    messages: {
      type: "Select the type of change that you're committing:",
      scope: "Enter the ticket number (e.g., ABC-123, PROJ-456):",
      subject: "Write a short, imperative tense description (lowercase):",
      body: "Provide a longer description of the change (optional but recommended):",
      footer: "List any breaking changes or issues closed by this change:",
      confirmCommit: "Are you satisfied with this commit?"
    },
    questions: {
      type: {
        description: "Select the type of change that you're committing:",
        enum: {
          feat: {
            description: "A new feature",
            title: "Features",
            emoji: "✨"
          },
          fix: {
            description: "A bug fix",
            title: "Bug Fixes",
            emoji: "🐛"
          },
          docs: {
            description: "Documentation only changes",
            title: "Documentation",
            emoji: "📚"
          },
          style: {
            description: "Changes that do not affect the meaning of the code",
            title: "Styles",
            emoji: "💎"
          },
          refactor: {
            description: "A code change that neither fixes a bug nor adds a feature",
            title: "Code Refactoring",
            emoji: "📦"
          },
          perf: {
            description: "A code change that improves performance",
            title: "Performance Improvements",
            emoji: "🚀"
          },
          test: {
            description: "Adding missing tests or correcting existing tests",
            title: "Tests",
            emoji: "🚨"
          },
          build: {
            description: "Changes that affect the build system or external dependencies",
            title: "Builds",
            emoji: "🛠"
          },
          ci: {
            description: "Changes to our CI configuration files and scripts",
            title: "Continuous Integrations",
            emoji: "⚙️"
          },
          chore: {
            description: "Other changes that don't modify src or test files",
            title: "Chores",
            emoji: "♻️"
          },
          revert: {
            description: "Reverts a previous commit",
            title: "Reverts",
            emoji: "🗑"
          },
          security: {
            description: "Security improvements",
            title: "Security",
            emoji: "🔒"
          },
          deps: {
            description: "Dependency updates",
            title: "Dependencies",
            emoji: "📦"
          },
          release: {
            description: "Release commits",
            title: "Releases",
            emoji: "🚀"
          }
        }
      },
      scope: {
        description: "Enter the ticket number (e.g., ABC-123, PROJ-456):"
      },
      subject: {
        description: "Write a short, imperative tense description (lowercase):"
      },
      body: {
        description: "Provide a longer description of the change:"
      },
      footer: {
        description: "List any breaking changes or issues closed:"
      }
    }
  },
};

export default Configuration;