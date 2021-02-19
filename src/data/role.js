const files = require.context('./role/', true, /\.json$/)
const roles = []

// key是相对路径名
files.keys().forEach(key => {
  roles.push(files(key))
})

export default roles
