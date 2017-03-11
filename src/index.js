class ServiceFactory {
  static baseUrl(host) {
    return new ServiceFactory(host)
  }

  constructor(host) {
    this.host = host
  }

  create(declaration) {
    return Object.keys(declaration).reduce((acc, current) => {
      acc[current] = () => {}
      return acc
    }, {})
  }
}

export default ServiceFactory
