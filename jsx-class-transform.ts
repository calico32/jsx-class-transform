// @ts-ignore - peer dependency
import type { NodePath, PluginObj } from '@babel/core'
// @ts-ignore - peer dependency
import type { JSXElement } from '@babel/types'
import { BabelStubs } from './babel-stubs'

export const transformClasses = (className: string): string[] => {
  const lines = className
    .split('\n')
    .map((line) => line.trim().split('//')[0])
    .filter((line) => !!line)

  let classes = []

  for (const line of lines) {
    const lineClasses = line.split(/\s+/).filter((className) => !!className)

    classes.push(...lineClasses)
  }

  return classes
}

type NodePath_JSXElement = unknown extends NodePath<JSXElement>
  ? BabelStubs.NodePath<BabelStubs.JSXElement>
  : NodePath<JSXElement>

const jsxClassTransform: () => PluginObj<any> = () => ({
  name: 'jsx-class-transform',
  visitor: {
    JSXElement(path: NodePath_JSXElement) {
      const attr = path.node.openingElement.attributes.find((attr) => {
        const attrName = (attr as any).name?.name?.name ?? (attr as any).name?.name
        return attrName === 'class' || attrName === 'className'
      })

      if (!attr || !('name' in attr)) return

      const { value: node } = attr
      if (!node) return

      if (node.type === 'StringLiteral') {
        node.value = transformClasses(node.value).join(' ').trim()

        return
      }

      if (node.type === 'JSXExpressionContainer') {
        const { expression: expr } = node
        if (expr.type === 'TemplateLiteral') {
          for (const [i, quasi] of expr.quasis.entries()) {
            const classes = transformClasses(quasi.value.cooked ?? quasi.value.raw)
              .join(' ')
              .trim()

            if (classes.length === 0) {
              if (i === 0 || i === expr.quasis.length - 1) {
                quasi.value.cooked = ''
              } else {
                quasi.value.cooked = ' '
              }
            } else if (i === 0) {
              quasi.value.cooked = classes + ' '
            } else if (i === expr.quasis.length - 1) {
              quasi.value.cooked = ' ' + classes
            } else {
              quasi.value.cooked = ' ' + classes + ' '
            }

            quasi.value.raw = quasi.value.cooked
          }
        }
      }
    },
  },
})

export default jsxClassTransform
