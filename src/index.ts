import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import * as deepmerge from "deepmerge"

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

  requestOptions(declaration: AxiosRequestConfig = {}) {
    return deepmerge(this.defaults, declaration)
  }

  withAuthHeader(params: ServiceRequestConfig) {
    if (!params || !params.accessToken) return params
    const { accessToken, ...config } = params
    return deepmerge(config, { headers: { Authorization: `Bearer ${accessToken}` } })
  }

  buildRequest(declaration: AxiosRequestConfig) {
    return (params: ServiceRequestConfig = {}) => {
      const config = deepmerge(this.requestOptions(declaration), this.withAuthHeader(params))
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
