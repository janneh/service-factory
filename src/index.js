import axios from "axios"

class ServiceFactory {
  static baseUrl(host) {
    return new ServiceFactory(host)
  }

  constructor(host) {
    this.host = host
  }

  create(declaration) {
    return Object.keys(declaration).reduce((acc, current) => {
      const url = `${this.host}${declaration[current].url}`
      const options = Object.assign({}, declaration[current], url)
      acc[current] = () => axios(options)
      return acc
    }, {})
  }
}

export default ServiceFactory
