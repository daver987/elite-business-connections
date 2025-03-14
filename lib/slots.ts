import type { VNode as VueVNode } from 'vue'

export const getSlotChildrenText = (children: VueVNode[]): string =>
  children
    .map((node) => {
      if (!node.children || typeof node.children === 'string')
        return node.children || ''
      if (Array.isArray(node.children))
        return getSlotChildrenText(node.children as VueVNode[])
      if (
        typeof node.children === 'object' &&
        'default' in node.children &&
        typeof node.children.default === 'function'
      )
        return getSlotChildrenText(node.children.default() as VueVNode[])
      return ''
    })
    .join('')
