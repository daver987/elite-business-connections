// Define types locally to remove dependency on Sanity types
export interface MarkDef {
  _type: string
  href?: string
  _key: string
}

export interface Child {
  _type: string
  text: string
  marks?: Array<string>
}

export interface BodyItem {
  _type: string
  style?: string
  postImage?: string
  markDefs?: Array<MarkDef>
  children?: Array<Child>
}

export function convertToHtml(body: BodyItem[]): string {
  let htmlOutput = ''
  body.forEach((item) => {
    if (item._type === 'image') {
      htmlOutput += `<img src="${item.postImage}" alt="image">\n`
    } else if (item._type === 'block') {
      const style = item.style
      const markDefs: Record<string, MarkDef> = Object.fromEntries(
        item.markDefs?.map((d: MarkDef) => [d._key, d]) || []
      )
      if (style === 'h1') {
        const text = item.children![0].text
        htmlOutput += `<h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl">${text}</h1>\n`
      } else if (style === 'h2') {
        const text = item.children![0].text
        htmlOutput += `<h2 class="text-3xl font-bold tracking-tight sm:text-4xl capitalize">${text}</h2>\n`
      } else if (style === 'normal') {
        let paragraph = ''
        item.children!.forEach((child: Child) => {
          let text = child.text
          const marks = child.marks || []
          if (marks.length > 0) {
            marks.forEach((mark: string) => {
              // Type guard for href
              if (markDefs[mark] && markDefs[mark].href) {
                const href = markDefs[mark].href
                text = `<a class="text-primary hover:text-primary" href="${href}">${text}</a>`
              }
            })
          }
          paragraph += `${text} `
        })
        htmlOutput += `<p class="text-base leading-7 text-gray-300">${paragraph.trim()}</p>\n`
      }
    }
  })
  return htmlOutput
}
