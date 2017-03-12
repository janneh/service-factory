import axios from "axios"

class ServiceFactory {
  static baseUrl(host) {
    return new ServiceFactory(host)
  }

  constructor(host) {
    this.client = axios.create({ baseURL: host })
  }

  create(declaration) {
    return Object.keys(declaration).reduce((acc, current) => {
      return Object.assign(acc, { [current]: () => this.client(declaration[current]) })
    }, {})
  }
}

export default ServiceFactory
