import axios from "axios"

class ServiceFactory {
  static baseUrl(host, defaults = {}) {
    return new ServiceFactory(host, defaults)
  }

  constructor(host, defaults) {
    this.client = axios.create({ baseURL: host })
    this.defaults = defaults
  }

  withDefaults(config) {
    this.defaults = config
    return this
  }

  requestOptions(options) {
    return Object.assign(this.defaults, options)
  }

  create(declaration) {
    return Object.keys(declaration).reduce((acc, current) => {
      return Object.assign(acc, {
        [current]: () => this.client(this.requestOptions(declaration[current]))
      })
    }, {})
  }
}

export default ServiceFactory
