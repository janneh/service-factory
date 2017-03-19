import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

class ServiceFactory {
  static baseUrl(host: string, defaults: AxiosRequestConfig = {}) {
    return new ServiceFactory(host, defaults)
  }

  private client: AxiosInstance
  private defaults: AxiosRequestConfig

  constructor(host: string, defaults: AxiosRequestConfig) {
    this.client = axios.create({ baseURL: host })
    this.defaults = defaults
  }

  withDefaults(defaults: AxiosRequestConfig) {
    this.defaults = defaults
    return this
  }

  requestOptions(declaration: AxiosRequestConfig) {
    return Object.assign(this.defaults, declaration)
  }

  buildRequest(declaration: AxiosRequestConfig) {
    return (params: AxiosRequestConfig) => this.client.request(Object.assign(this.requestOptions(declaration), params))
  }

  create(declaration: any) {
    return Object.keys(declaration).reduce((acc, current) => {
      return Object.assign(acc, {
        [current]: this.buildRequest(declaration[current])
      })
    }, {})
  }
}

export default ServiceFactory
