// core
import { h, hydrate, removeAllChildNodes, render, tick } from '../core'
import { hydrateLazy } from '../lazy'
import { nodeToString, task } from '../helpers'

// useful tools
import { Component } from '../component'
import { Fragment } from '../fragment'
import { Store } from '../store'
import { createContext } from '../context'
import { withStyles } from '../withStyles'

// built-in components
import { Helmet } from '../components/helmet'
import { Link } from '../components/link'
import { Img } from '../components/img'
import { Visible } from '../components/visible'
import * as Router from '../components/router'

// tagged templates
import { jsx } from '../jsx'

// ui
import * as UI from '../ui/index'

export default {
  Component,
  Fragment,
  Helmet,
  Img,
  Link,
  Router,
  Store,
  UI,
  Visible,
  createContext,
  h,
  hydrate,
  hydrateLazy,
  jsx,
  nodeToString,
  removeAllChildNodes,
  render,
  task,
  tick,
  withStyles
}

// version
export { printVersion } from '../helpers'
export { VERSION } from '../version'
