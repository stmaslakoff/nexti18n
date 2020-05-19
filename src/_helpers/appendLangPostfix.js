export default function appendLangPostfix(url, lang) {
    if (!url || !url.length) return url

    return `/${url.replace(/^\//, '').replace(/\/$/, '')}/${lang}`
}
