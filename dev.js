import ServiceFactory from "./src"

function get(url) {
  if (!url) throw Error("@get: argument url is required")
  return (target, key, descriptor) => {
    const initializer = descriptor.initializer
    const value = typeof target[key] === "object" ? target[key] : {}
    descriptor.initializer = function () {
      return Object.assign({ method: "GET", url }, value)
    }
    return descriptor
  }
}

const declaration = {
  testGet: { 
    method: "get",
    url: "/get"
  }
}

console.log(declaration)

const defaults = { headers: { Accept: "application/json", "Content-Type": "application/json" } }
const service = ServiceFactory.baseUrl("http://httpbin.org").withDefaults(defaults).create(declaration)

service.testGet()
  .then(response => { console.log(response.data) })
  .catch(error => { console.log(error) })
