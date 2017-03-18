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

test("ServiceFactory created service GET request", (t) => {
  t.plan(1)
  moxios.install()
  const service = ServiceFactory.baseUrl("www.foo.com").create(declaration)
  const expected = "hello"
  moxios.stubRequest("www.foo.com/todos", {
    status: 200,
    responseText: "hello"
  })
  const callback = sinon.spy()
  service.allTodos().then(callback)
  moxios.wait(() => {
    t.equal(callback.getCall(0).args[0].data, "hello", "should be able to call service with GET request")
  })
})

test("ServiceFactory created service POST request", (t) => {
  t.plan(1)
  moxios.install()
  const service = ServiceFactory.baseUrl("www.foo.com").create(declaration)
  const expected = "hello"
  moxios.stubRequest("www.foo.com/todos", {
    status: 200,
    responseText: "hello"
  })
  const callback = sinon.spy()
  service.allTodos().then(callback)
  moxios.wait(() => {
    t.equal(callback.getCall(0).args[0].data, "hello", "should be able to call service with GET request")
  })
})