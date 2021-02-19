const files = require.context('./data/', true, /\.json$/)
const list = []

// key是相对路径名
files.keys().forEach(key => {
  // console.log(files(key))
  list.push(files(key))
})

export default list
