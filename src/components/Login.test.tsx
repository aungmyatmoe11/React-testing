import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Login from "./Login/Login"

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: () => ({
      data: { id: 1, firstname: "Aung" },
    }),
  },
}))

// ! render check
test("username input should be random", () => {
  render(<Login />)
  const usernameInputEle = screen.getByPlaceholderText(/username/i)
  expect(usernameInputEle).toBeInTheDocument()
})

test("password input should be masked", () => {
  render(<Login />)
  const passwordInputEle = screen.getByPlaceholderText(/password/i)
  expect(passwordInputEle).toBeInTheDocument()
})

test("button should be rendered", () => {
  render(<Login />)
  const buttonInputEle = screen.getByRole("button")
  expect(buttonInputEle).toBeInTheDocument()
})

// ! empty check

test("username input should be empty", () => {
  render(<Login />)
  const usernameInputEle = screen.getByPlaceholderText(/username/i)
  expect(usernameInputEle.value).toBe("")
})

test("password input should be empty", () => {
  render(<Login />)
  const passwordInputEle = screen.getByPlaceholderText(/password/i)
  expect(passwordInputEle.value).toBe("")
})

test("button should be disabled", () => {
  render(<Login />)
  const buttonInputEle = screen.getByRole("button")
  expect(buttonInputEle).toBeDisabled()
})

// ! error message

test("error message should be visible", () => {
  render(<Login />)
  const errorMessageEle = screen.getByTestId("error")
  expect(errorMessageEle).not.toBeVisible()
  // expect(errorMessageEle).toBeVisible();
  expect(errorMessageEle).toBeInTheDocument()
  expect(errorMessageEle.textContent).toBe("Something went wrong!")
})

// ! state

test("username input should be change", () => {
  render(<Login />)
  const usernameInputEle = screen.getByPlaceholderText(/username/i)
  const testValue = "test"

  fireEvent.change(usernameInputEle, { target: { value: testValue } })
  expect(usernameInputEle.value).toBe(testValue)
})

test("password input should be change", () => {
  render(<Login />)
  const passwordInputEle = screen.getByPlaceholderText(/password/i)
  const testValue = "test"

  fireEvent.change(passwordInputEle, { target: { value: testValue } })
  expect(passwordInputEle.value).toBe(testValue)
})

test("button should not be disabled when inputs exists", () => {
  render(<Login />)
  const buttonEle = screen.getByRole("button")
  const usernameInputEle = screen.getByPlaceholderText(/username/i)
  const passwordInputEle = screen.getByPlaceholderText(/password/i)

  const testValue = "test"
  fireEvent.change(usernameInputEle, { target: { value: testValue } })
  fireEvent.change(passwordInputEle, { target: { value: testValue } })

  expect(buttonEle).not.toBeDisabled()
})

// ! Loading
test("loading should not be rendered", () => {
  render(<Login />)
  const loadingEle = screen.getByRole("button")
  expect(loadingEle).not.toHaveTextContent(/loading.../i)
})

test("loading should  be rendered when click", () => {
  render(<Login />)
  const buttonEle = screen.getByRole("button")
  const usernameInputEle = screen.getByPlaceholderText(/username/i)
  const passwordInputEle = screen.getByPlaceholderText(/password/i)
  const testValue = "test"

  fireEvent.change(usernameInputEle, { target: { value: testValue } })
  fireEvent.change(passwordInputEle, { target: { value: testValue } })
  fireEvent.click(buttonEle)

  expect(buttonEle).toHaveTextContent(/loading.../i)
})

test("loading should not be rendered after fetching", async () => {
  render(<Login />)
  const buttonEle = screen.getByRole("button")
  const usernameInputEle = screen.getByPlaceholderText(/username/i)
  const passwordInputEle = screen.getByPlaceholderText(/password/i)
  const testValue = "test"

  fireEvent.change(usernameInputEle, { target: { value: testValue } })
  fireEvent.change(passwordInputEle, { target: { value: testValue } })
  fireEvent.click(buttonEle)

  // ! can't use getbytext because its synchronous
  const userSpanItem = await screen.findByText("Aung") // ! should use findbyTest

  expect(userSpanItem).not.toBeEmptyDOMElement()
  expect(userSpanItem).toBeInTheDocument()
})
