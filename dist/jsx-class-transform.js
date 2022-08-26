export const transformClasses = (className) => {
    const lines = className
        .split('\n')
        .map((line) => line.trim().split('//')[0].split('#')[0])
        .filter((line) => !!line);
    let classes = [];
    for (const line of lines) {
        const lineClasses = line.split(/\s+/).filter((className) => !!className);
        classes.push(...lineClasses);
    }
    return classes;
};
const jsxClassTransform = () => ({
    name: 'jsx-class-transform',
    visitor: {
        JSXElement(path) {
            const attr = path.node.openingElement.attributes.find((attr) => 'name' in attr && (attr.name.name.name ?? attr.name.name) === 'class');
            if (!attr || !('name' in attr))
                return;
            const { value: node } = attr;
            if (!node)
                return;
            if (node.type === 'StringLiteral') {
                node.value = transformClasses(node.value).join(' ').trim();
                return;
            }
            if (node.type === 'JSXExpressionContainer') {
                const { expression: expr } = node;
                if (expr.type === 'TemplateLiteral') {
                    for (const [i, quasi] of expr.quasis.entries()) {
                        const classes = transformClasses(quasi.value.cooked ?? quasi.value.raw)
                            .join(' ')
                            .trim();
                        if (classes.length === 0) {
                            if (i === 0 || i === expr.quasis.length - 1) {
                                quasi.value.cooked = '';
                            }
                            else {
                                quasi.value.cooked = ' ';
                            }
                        }
                        else if (i === 0) {
                            quasi.value.cooked = classes + ' ';
                        }
                        else if (i === expr.quasis.length - 1) {
                            quasi.value.cooked = ' ' + classes;
                        }
                        else {
                            quasi.value.cooked = ' ' + classes + ' ';
                        }
                        quasi.value.raw = quasi.value.cooked;
                    }
                }
            }
        },
    },
});
export default jsxClassTransform;
//# sourceMappingURL=jsx-class-transform.js.map