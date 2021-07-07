function getAttr(attr)
{
    let s = window.location.search;
    let ok = false;
    let size = s.length;
    let l = 0;
    let str = '';
    for (let i = 0;i < size;i ++)
    {
        if (s[i] === '&') {
            if (!ok) {
                ok = true;
                str += s[i];
            }
        } else {
            ok = false;
            str += s[i];
        }
    }
    s = str;
    size = s.length;
    if (s[size - 1] === '&') size --;
    ok = false;
    str = '';
    for (let i = 0;i < size + 1;i ++)
    {
        if (s[i] === '?') continue;
        if (s[i] === '=' && !ok) {
            if (l !== 0) str += '":"';
            ok = true;
        } else if (s[i] === '&' || i === size) {
            if (l !== 0) {
                if (!ok) str += '":"';
                str += '","';
            }
            ok = false;
            l = 0;
        } else {
            if (l !== 0 || !ok) str += s[i];
            if (!ok) l ++;
        }
    }
    size = str.length;
    if (str[size - 1] === '"') str = str.substr(0,size - 3);
    let attrs = null;
    if (str !== '')
    {
        str = '{"' + str + '"}';
        attrs = JSON.parse(str);
    }
    if (attr != null) {
        if (attrs !== null) return attrs[attr];
        return null;
    }
    return attrs;
}