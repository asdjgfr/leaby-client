module.exports = {
  env: {
    browser: true,
    node: true,
  },
  plugins: ["jsdoc", "import", "prettier"],
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "plugin:jsdoc/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",

    // import
    "import/first": "error",
    "import/no-duplicates": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        pathGroups: [
          {
            pattern: "vue",
            group: "external",
            position: "before",
          },
          {
            pattern: "@vue/**",
            group: "external",
            position: "before",
          },
          {
            pattern: "@element-plus/**",
            group: "internal",
          },
        ],
        pathGroupsExcludedImportTypes: ["type"],
      },
    ],
  },
  overrides: [
    {
      files: [
        "**/pages/**/*.{js,ts,vue}",
        "**/layouts/**/*.{js,ts,vue}",
        "**/components/**/*.{js,ts,vue}",
        "**/app.{js,ts,vue}",
        "**/error.{js,ts,vue}",
      ],
      rules: {
        "no-undef": "off",
        "vue/multi-word-component-names": "off",
        "vue/no-multiple-template-root": "off",
      },
    },
    {
      files: ["tailwind.config.js"],
      rules: {
        "jsdoc/valid-types": "off",
      },
    },
  ],
  ignorePatterns: ["*.json"],
};
