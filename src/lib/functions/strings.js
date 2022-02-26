const isAlphanumeric = (char) => {
    if (!char || char.length > 1) return false;

    const code = char.charCodeAt(0);
    return (code > 47 && code < 58) || (code > 64 && code < 91) || (code > 96 && code < 123);
}

export { isAlphanumeric };