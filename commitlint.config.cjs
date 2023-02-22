module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "WIP",
        "feat",
        "test",
        "fix",
        "lint",
        "upgrade",
        "downgrade",
        "product",
        "backend",
        "chore",
        "docs",
        "refactor",
        "style",
        "ci",
        "perf",
        "release",
      ],
    ],
  },
};
