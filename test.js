import test from "ava"
import sinon from "sinon"
import moxios from "moxios"

import ServiceFactory from "./dist"

const declaration = {
  allTodos: {
    method: "GET",
    url: "/todos"
  },
  createTodo: {
    method: "POST",
    url: "/todos"
  }
}

test.beforeEach(() => { moxios.install() })

test.afterEach(() => { moxios.uninstall() })

test("ServiceFactory create()", (t) => {
  const service = ServiceFactory.baseUrl("www.foo.com").create(declaration)
  t.is(typeof service.allTodos, "function")
})

test("ServiceFactory created GET request", async t => {
  const service = ServiceFactory.baseUrl("www.foo.com").create(declaration)
  const expected = "hello"
  moxios.stubRequest("www.foo.com/todos", {
    status: 200,
    responseText: expected
  })
  const response = await service.allTodos()
  t.is(response.data, expected)
})

test("ServiceFactory created POST request", async t => {
  const service = ServiceFactory.baseUrl("www.foo.com").create(declaration)
  const expected = "hello"
  moxios.stubRequest("www.foo.com/todos", {
    status: 200,
    responseText: expected
  })
  const response = await service.createTodo()
  t.is(response.data, expected)
})

test("ServiceFactory created POST sends data", async t => {
  const service = ServiceFactory.baseUrl("www.foo.com").create(declaration)
  const expected = { "hello": "world" }
  moxios.stubRequest("www.foo.com/todos", {
    status: 200,
    responseText: "hello"
  })
  service.createTodo({ data: expected }).then(() => {
    const actual = moxios.requests.mostRecent().config
    t.is(actual.data, JSON.stringify(expected))
  })
})

test("ServiceFactory request with access token auth", async t => {
  const service = ServiceFactory.baseUrl("www.foo.com").create(declaration)
  const expected = "secret"
  moxios.stubRequest("www.foo.com/todos", {
    status: 200,
    responseText: expected
  })
  const response = await service.allTodos({ accessToken: expected }).then(() => {
    const actual = moxios.requests.mostRecent().config
    t.is(actual.headers.Authorization, `Bearer ${expected}`)
  })
})