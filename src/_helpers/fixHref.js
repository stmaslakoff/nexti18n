import i from './_internals'
import appendLangPostfix from './appendLangPostfix'

export default (href, lng) => {
  const isDefault = !i.redirectToDefaultLang && i.defaultLanguage === lng
  return i.isStaticMode && !isDefault ? appendLangPostfix(href, lng) : href
}
