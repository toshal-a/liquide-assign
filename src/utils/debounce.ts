export function debounce(callback, wait) {
    let timeout;
    return function(...args) {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            callback.apply(this, args);
        }, wait);
    };
}
