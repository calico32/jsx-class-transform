export namespace BabelStubs {
  type BabelFile = unknown

  type VisitNode<S, P extends Node> = VisitNodeFunction<S, P> | VisitNodeObject<S, P>

  type VisitNodeFunction<S, P extends Node> = (this: S, path: NodePath<P>, state: S) => void

  type NodeType = Node['type']

  interface VisitNodeObject<S, P extends Node> {
    enter?: VisitNodeFunction<S, P> | undefined
    exit?: VisitNodeFunction<S, P> | undefined
    denylist?: NodeType[] | undefined
    /**
     * @deprecated will be removed in Babel 8
     */
    blacklist?: NodeType[] | undefined
  }

  type Visitor<S = {}> = VisitNodeObject<S, Node> & {
    [Type in Node['type']]?: VisitNode<S, Extract<Node, { type: Type }>>
  }

  interface PluginPass {
    file: BabelFile
    key: string
    opts: object
    cwd: string
    filename: string | undefined
    get(key: unknown): any
    set(key: unknown, value: unknown): void
    [key: string]: unknown
  }

  interface PluginObj<S = PluginPass> {
    name?: string | undefined
    manipulateOptions?(opts: any, parserOpts: any): void
    pre?(this: S, file: BabelFile): void
    visitor: Visitor<S>
    post?(this: S, file: BabelFile): void
    inherits?: any
  }

  interface BaseComment {
    value: string
    start?: number
    end?: number
    loc?: SourceLocation
    ignore?: boolean
    type: 'CommentBlock' | 'CommentLine'
  }
  interface CommentBlock extends BaseComment {
    type: 'CommentBlock'
  }
  interface CommentLine extends BaseComment {
    type: 'CommentLine'
  }
  type Comment = CommentBlock | CommentLine
  interface SourceLocation {
    start: {
      line: number
      column: number
    }
    end: {
      line: number
      column: number
    }
  }
  interface BaseNode {
    type: Node['type']
    leadingComments?: Comment[] | null
    innerComments?: Comment[] | null
    trailingComments?: Comment[] | null
    start?: number | null
    end?: number | null
    loc?: SourceLocation | null
    range?: [number, number]
    extra?: Record<string, unknown>
  }

  interface StringLiteral extends BaseNode {
    type: 'StringLiteral'
    value: string
  }

  interface JSXAttribute extends BaseNode {
    type: 'JSXAttribute'
    name: JSXIdentifier | JSXNamespacedName
    value?: JSXElement | JSXFragment | StringLiteral | JSXExpressionContainer | null
  }
  interface JSXClosingElement extends BaseNode {
    type: 'JSXClosingElement'
    name: JSXIdentifier | JSXMemberExpression | JSXNamespacedName
  }
  interface JSXElement extends BaseNode {
    type: 'JSXElement'
    openingElement: JSXOpeningElement
    closingElement?: JSXClosingElement | null
    children: Array<JSXText | JSXExpressionContainer | JSXSpreadChild | JSXElement | JSXFragment>
    selfClosing?: boolean | null
  }
  interface JSXEmptyExpression extends BaseNode {
    type: 'JSXEmptyExpression'
  }
  interface JSXExpressionContainer extends BaseNode {
    type: 'JSXExpressionContainer'
    expression: Expression | JSXEmptyExpression
  }
  interface JSXSpreadChild extends BaseNode {
    type: 'JSXSpreadChild'
    expression: Expression
  }
  interface JSXIdentifier extends BaseNode {
    type: 'JSXIdentifier'
    name: string
  }
  interface JSXMemberExpression extends BaseNode {
    type: 'JSXMemberExpression'
    object: JSXMemberExpression | JSXIdentifier
    property: JSXIdentifier
  }
  interface JSXNamespacedName extends BaseNode {
    type: 'JSXNamespacedName'
    namespace: JSXIdentifier
    name: JSXIdentifier
  }
  interface JSXOpeningElement extends BaseNode {
    type: 'JSXOpeningElement'
    name: JSXIdentifier | JSXMemberExpression | JSXNamespacedName
    attributes: Array<JSXAttribute | JSXSpreadAttribute>
    selfClosing: boolean
  }
  interface JSXSpreadAttribute extends BaseNode {
    type: 'JSXSpreadAttribute'
    argument: Expression
  }
  interface JSXText extends BaseNode {
    type: 'JSXText'
    value: string
  }
  interface JSXFragment extends BaseNode {
    type: 'JSXFragment'
    openingFragment: JSXOpeningFragment
    closingFragment: JSXClosingFragment
    children: Array<JSXText | JSXExpressionContainer | JSXSpreadChild | JSXElement | JSXFragment>
  }
  interface JSXOpeningFragment extends BaseNode {
    type: 'JSXOpeningFragment'
  }
  interface JSXClosingFragment extends BaseNode {
    type: 'JSXClosingFragment'
  }

  interface TemplateElement extends BaseNode {
    type: 'TemplateElement'
    value: {
      raw: string
      cooked?: string
    }
    tail: boolean
  }
  interface TemplateLiteral extends BaseNode {
    type: 'TemplateLiteral'
    quasis: Array<TemplateElement>
    expressions: Array<Expression>
  }

  type Node =
    | JSXAttribute
    | JSXClosingElement
    | JSXClosingFragment
    | JSXElement
    | JSXEmptyExpression
    | JSXExpressionContainer
    | JSXFragment
    | JSXIdentifier
    | JSXMemberExpression
    | JSXNamespacedName
    | JSXOpeningElement
    | JSXOpeningFragment
    | JSXSpreadAttribute
    | JSXSpreadChild
    | JSXText
    | StringLiteral
    | TemplateElement
    | TemplateLiteral

  type Expression = StringLiteral | TemplateLiteral | JSXElement | JSXFragment

  class NodePath<T = Node> {
    parent: Node
    data: object
    shouldSkip: boolean
    shouldStop: boolean
    removed: boolean
    state: any
    opts: object
    skipKeys: object
    container: object | object[]
    listKey: string
    inList: boolean
    parentKey: string
    key: string | number
    node: T
    type: T extends null | undefined ? undefined : T extends Node ? T['type'] : string | undefined
    typeAnnotation: object
  }
}
