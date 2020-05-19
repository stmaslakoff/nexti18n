import i from './_internals'
import appendLangPostfix from './appendLangPostfix'

export default (as, href, lng) => {
  const isDefault = !i.redirectToDefaultLang && i.defaultLanguage === lng
  if (isDefault && i.isStaticMode) return as
  return i.isStaticMode
    ? appendLangPostfix(as, lng)
    : appendLangPostfix(as || href, lng)
}
