/**
 * expires
 * maxAge
 * path
 * domain
 * secure
 * isSendByHeader
 * httpOnly
 *
 */

export default {
    setCookie(
        key,
        value,
        { maxAge = 0, secure = false, header, httpOnly = false, convert }
    ) {
        const { host, port, pathname: path } = location;
        const domain = host + port ? ':' + port : '';

        const __value__ = Object.entries({
            start: Date.now(),
            value,
            maxAge,
            domain,
            path,
            secure,
            httpOnly,
            header
        })
            .reduce((prev, [k, v]) => {
                const val = (convert && convert(v)) || v;
                prev.push(`${k}=${val}`);
                return prev;
            }, [])
            .join('&');

        localStorage.setItem(key, _value_);
    },
    clear: () => {
        localStorage.clear();
    }
};
