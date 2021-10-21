module.exports = (source) => {
    const json = JSON.stringify(source);
    return `export default ${json}`

}