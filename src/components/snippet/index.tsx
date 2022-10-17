import React, { FC } from 'react'
import './index.scss'

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

interface ISnippetComponentProp {
  // You should declare props like this, delete this if you don't need props
  someProp: any
  somePropWithDefaultOption?: string
}

const SnippetComponentDefaultProps = {
  // You should declare default props like this, delete this if you don't need props
  somePropWithDefaultOption: 'default value'
}

const SnippetComponent: FC<ISnippetComponentProp> = ({ someProp }) => {
  return <></>
}

SnippetComponent.defaultProps = SnippetComponentDefaultProps

export default SnippetComponent
