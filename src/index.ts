import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

interface ServiceDeclaration {
  [requestName: string]: AxiosRequestConfig
}

interface ServiceRequestConfig extends AxiosRequestConfig {
  accessToken?: string
}

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

  mergeOptions(a: ServiceRequestConfig = {}, b: ServiceRequestConfig = {}) {
    const data = Object.assign({}, a.data, b.data)
    const params = Object.assign({}, a.params, b.params)
    const headers = Object.assign({}, a.headers, b.headers)
    return Object.assign(a, b, { data, params, headers })
  }

  requestOptions(declaration: AxiosRequestConfig) {
    return this.mergeOptions(this.defaults, declaration)
  }

  addAuthHeader(params: ServiceRequestConfig) {
    if (!params || !params.accessToken) return params
    const { accessToken, ...config } = params
    config.headers = Object.assign({}, config.headers, { Authorization: `Bearer ${accessToken}` })
    return config
  }

  buildRequest(declaration: AxiosRequestConfig) {
    return (params: ServiceRequestConfig) => {
      const config = this.mergeOptions(this.requestOptions(declaration), this.addAuthHeader(params))
      return this.client.request(config)
    }
  }

  create(declaration: ServiceDeclaration) {
    return Object.keys(declaration).reduce((acc, current) => {
      return Object.assign(acc, {
        [current]: this.buildRequest(declaration[current])
      })
    }, {})
  }
}

export default ServiceFactory
