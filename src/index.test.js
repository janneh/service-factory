import test from "tape"
import moxios from "moxios"
import sinon from "sinon"

import ServiceFactory from "./index"

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

test("ServiceFactory create()", (t) => {
  t.plan(1)
  const service = ServiceFactory.baseUrl("www.foo.com").create(declaration)
  t.equal(typeof service.allTodos, "function", "should create service with allTodos function")
})

test("ServiceFactory created GET request", (t) => {
  t.plan(1)
  moxios.install()
  const service = ServiceFactory.baseUrl("www.foo.com").create(declaration)
  const expected = "hello"
  moxios.stubRequest("www.foo.com/todos", {
    status: 200,
    responseText: expected
  })
  const callback = sinon.spy()
  service.allTodos().then(callback)
  moxios.wait(() => {
    const actual = callback.getCall(0).args[0].data
    t.equal(actual, expected, "should be able to call service with GET request")
    moxios.uninstall()
  })
})

test("ServiceFactory created POST request", (t) => {
  t.plan(1)
  moxios.install()
  const service = ServiceFactory.baseUrl("www.foo.com").create(declaration)
  const expected = "hello"
  moxios.stubRequest("www.foo.com/todos", {
    status: 200,
    responseText: expected
  })
  const callback = sinon.spy()
  service.createTodo().then(callback)
  moxios.wait(() => {
    const actual = callback.getCall(0).args[0].data
    t.equal(actual, expected, "should be able to call service with GET request")
    moxios.uninstall()
  })
})

test("ServiceFactory created POST sends data", (t) => {
  t.plan(1)
  moxios.install()
  const service = ServiceFactory.baseUrl("www.foo.com").create(declaration)
  const expected = { "hello": "world" }
  moxios.stubRequest("www.foo.com/todos", {
    status: 200,
    responseText: "hello"
  })
  const callback = sinon.spy()
  service.allTodos({ data: expected }).then(callback)
  moxios.wait(() => {
    const actual = moxios.requests.mostRecent().config.data
    t.equal(actual, JSON.stringify(expected), "should be able to call service with GET request")
    moxios.uninstall()
  })
})