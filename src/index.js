import './scss/index.scss'

console.log('Hello')

async function start() {
    return await Promise.resolve('async working !')
}

start().then(console.log)

if (true) {
    return true
}
