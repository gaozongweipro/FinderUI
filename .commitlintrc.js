module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能
        'fix',      // 修复bug
        'docs',     // 文档更新
        'style',    // 代码格式（不影响功能）
        'refactor', // 重构
        'perf',     // 性能优化
        'test',     // 测试相关
        'build',    // 构建系统或外部依赖项
        'ci',       // CI/CD 相关
        'chore',    // 其他修改
        'revert'    // 回滚提交
      ]
    ],
    'subject-case': [0] // 允许任何格式的提交信息
  }
}   
