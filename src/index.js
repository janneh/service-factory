import axios from "axios"

class ServiceFactory {
  static baseUrl(host, defaults = {}) {
    return new ServiceFactory(host, defaults)
  }

  constructor(host, defaults) {
    this.client = axios.create({ baseURL: host })
    this.defaults = defaults
  }

  withDefaults(defaults) {
    this.defaults = defaults
    return this
  }

  requestOptions(declaration) {
    return Object.assign(this.defaults, declaration)
  }

  buildRequest(declaration) {
    return params => this.client(Object.assign(this.requestOptions(declaration), params))
  }

  create(declaration) {
    return Object.keys(declaration).reduce((acc, current) => {
      return Object.assign(acc, {
        [current]: this.buildRequest(declaration[current])
      })
    }, {})
  }
}

export default ServiceFactory
