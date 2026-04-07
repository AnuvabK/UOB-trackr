
function somePromise() {
    return new Promise((resolve, reject) => {
    resolve("Resolved.")
})}

async function somePromise_() {
    return "Resolved."
}

// use promise
somePromise_().then(setTimeout)
// 

// use async functoin
async function myFunc() {
    await somePromise_()
    await setTimeout
}
myFunc()
//

// async declaration seems to exist to ensure any function that starts a promise also returns a promise
// Don't want to block main thread?