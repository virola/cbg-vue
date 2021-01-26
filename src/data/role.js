const files = require.context('./role/', true, /\.json$/)
const roles = []

// key是相对路径名
files.keys().forEach(key => {
    // const name = files(key).default.name
    roles.push(files(key).default)
})

export default roles
