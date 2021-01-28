import Nano, { Component } from '../lib/index.js'
import { wait, nodeToString } from './helpers.js'
import * as Router from '../lib/components/router.js'

const spy = jest.spyOn(global.console, 'error')

test('should render without errors', async (done) => {
  class Children extends Component {
    render() {
      return (
        <div id="children">
          <Router.Switch>
            <Router.Route exact path="/children/one">
              <div>Child One</div>
            </Router.Route>
            <Router.Route path="/children/two">
              <div>Child Two</div>
            </Router.Route>
          </Router.Switch>
        </div>
      )
    }
  }

  class App extends Component {
    didMount() {
      setTimeout(() => Router.to('/about'), 150)
      setTimeout(() => Router.to('/children/one'), 250)
      setTimeout(() => Router.to('/children/two'), 350)
      setTimeout(() => Router.to('/'), 450)
      setTimeout(() => Router.to('/abc123'), 550)
      setTimeout(() => Router.to('/nothing'), 650)
    }

    render() {
      return (
        <div id="root">
          <Router.Switch fallback={() => <div>404: Page Not Found</div>}>
            <Router.Route exact path="/">
              <div>Home Route</div>
            </Router.Route>
            <Router.Route path="/about">
              <div>About Route</div>
            </Router.Route>
            <Router.Route path="/:id" regex={{ id: /^[a-f0-9]{6}$/ }}>
              <div>Regex Route</div>
            </Router.Route>
            <Router.Route path="/children">
              <Children />
            </Router.Route>
          </Router.Switch>
        </div>
      )
    }
  }

  const res = Nano.render(<App />, document.body)

  await wait(100)
  expect(nodeToString(res)).toBe('<body><div id="root"><div>Home Route</div></div></body>')

  await wait(100)
  expect(nodeToString(res)).toBe('<body><div id="root"><div>About Route</div></div></body>')

  await wait(100)
  expect(nodeToString(res)).toBe('<body><div id="root"><div id="children"><div>Child One</div></div></div></body>')

  await wait(100)
  expect(nodeToString(res)).toBe('<body><div id="root"><div id="children"><div>Child Two</div></div></div></body>')

  await wait(100)
  expect(nodeToString(res)).toBe('<body><div id="root"><div>Home Route</div></div></body>')

  await wait(100)
  expect(nodeToString(res)).toBe('<body><div id="root"><div>Regex Route</div></div></body>')

  await wait(100)
  expect(nodeToString(res)).toBe('<body><div id="root"><div>404: Page Not Found</div></div></body>')

  expect(spy).not.toHaveBeenCalled()
  done()
})
