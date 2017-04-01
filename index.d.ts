// Type definitions for 'service-factory' version 0.2.0
// Definitions by: janneh

import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios"

export interface ServiceDeclaration {
  [requestName: string]: AxiosRequestConfig
}

export interface ServiceRequestConfig extends AxiosRequestConfig {
  accessToken?: string
}

export interface ServiceClient {
  [requestName: string]: (params?: ServiceRequestConfig) => AxiosPromise
}

export interface ServiceFactory {
  (host: string, defaults?: AxiosRequestConfig): ServiceFactory
  baseUrl(host: string, defaults?: AxiosRequestConfig): ServiceFactory
  withDefaults(defaults: AxiosRequestConfig): ServiceFactory
  create(declaration: ServiceDeclaration): ServiceClient
}

declare const ServiceFactory: ServiceFactory;

export default ServiceFactory;
