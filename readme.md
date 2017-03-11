service-factory
=====================

Declarative HTTP client builder

## Install

```sh
$ npm install --save service-factory
```

## Usage

```js
import ServiceFactory from "service-factory"

const declaration = {

  listUsers: {
    method: "GET",
    url: "/users"
  },

  findUser: {
    method: "GET",
    url: "/users/:id"
  },

  createUser: {
    method: "POST",
    url: "/users"
  }

}

const service = ServiceFactory.baseUrl("www.example.com").create(declaration)

const users = await service.listUsers()
```
