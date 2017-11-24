import Vue from 'vue'
export const EMAIL_REGEX = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+?\.[a-zA-Z]{2,5}$/

function commonValidator (regex, defaultMessage, rule, value, callback) {
  if (!value || regex.test(value)) {
    callback()
  } else {
    callback(new Error(rule.message || defaultMessage))
  }
}

/**
 * 邮箱验证
 */
export function email (rule, value, callback) {
  commonValidator(EMAIL_REGEX, Vue.t('validation.email'), rule, value, callback)
}
