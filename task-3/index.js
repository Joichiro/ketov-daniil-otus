const getPath = el => {
    let path = [];
    while (
        el !== null &&
        el.nodeName !== null &&
        el.nodeName.toLowerCase() !== 'body' &&
        path.unshift(
            el.nodeName.toLowerCase() +
            (el.childElementCount > 0
                ? `:nth-child(${Array.from(el.parentNode.children).indexOf(el) + 1})`
                : '') +
            (el.id ? `#${el.id}` : '') +
            (el.className ? `.${el.className.replace(/\s+/g, '.')}` : '')
        ) &&
        (el = el.parentNode)
        ) {}
    return path.join(' > ');
};

//example
//getPath(document.querySelectorAll('p')[1])
