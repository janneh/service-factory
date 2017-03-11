import test from "tape"
import ServiceFactory from "./index"

test("ServiceFactory create service", (t) => {
  t.plan(1)
  const declaration = {
    allTodos: {
      method: "GET",
      url: "/todos"
    }
  }
  const service = ServiceFactory.baseUrl("www.foo.com").create(declaration)
  t.equal(typeof service.allTodos, "function", "should create service with allTodos function")
})
