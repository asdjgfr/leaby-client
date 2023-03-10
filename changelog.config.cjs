module.exports = {
  disableEmoji: false,
  format: "{type}{scope}: {emoji}{subject}",
  list: [
    "wip",
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
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: [
    "type",
    "scope",
    "subject",
    "body",
    "breaking",
    "issues",
    "lerna",
  ],
  scopes: [],
  types: {
    wip: {
      description: "work in progress",
      emoji: "ð¨",
      value: "wip",
    },
    chore: {
      description: "æå»ºè¿ç¨æè¾å©å·¥å·æ´æ¹",
      emoji: "ð¤",
      value: "chore",
    },
    ci: {
      description: "CI ç¸å³åæ´",
      emoji: "ð¡",
      value: "ci",
    },
    docs: {
      description: "ä»ææ¡£åæ´",
      emoji: "ð",
      value: "docs",
    },
    feat: {
      description: "æ°åè½",
      emoji: "â¨",
      value: "feat",
    },
    fix: {
      description: "Bug ä¿®å¤",
      emoji: "ð",
      value: "fix",
    },
    perf: {
      description: "æ§è½ä¼å",
      emoji: "â¡ï¸",
      value: "perf",
    },
    refactor: {
      description: "æ¢ä¸ä¿®å¤ bug ä¹ä¸æ·»å åè½çä»£ç æ´æ¹",
      emoji: "ð¡",
      value: "refactor",
    },
    release: {
      description: "åå»ºä¸ä¸ª release",
      emoji: "ð¹",
      value: "release",
    },
    style: {
      description: "ä»£ç é£æ ¼åæ´ï¼Markup, ç©ºç½ãæ ¼å¼ãç¼ºå°åå·ç­",
      emoji: "ð",
      value: "style",
    },
    test: {
      description: "æ·»å æµè¯ç¨ä¾",
      emoji: "â",
      value: "test",
    },
    backend: {
      description: "åç«¯ä¿®æ¹å¯¼è´çåæ´",
      emoji: "ð½",
      value: "backend",
    },
    product: {
      description: "äº§åä¿®æ¹å¯¼è´çåæ´",
      emoji: "ð",
      value: "product",
    },
    lint: {
      description: "ä¿®å¤ lint è­¦å",
      emoji: "ð¨",
      value: "lint",
    },
    upgrade: {
      description: "ä¾èµæ´æ°",
      emoji: "â¬ï¸",
      value: "upgrade",
    },
    downgrade: {
      description: "ä¾èµéçº§",
      emoji: "â¬ï¸",
      value: "downgrade",
    },
  },
};
