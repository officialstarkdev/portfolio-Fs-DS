/**
 * Dependency-free text splitter (chars or words, wrapped in an
 * overflow-hidden line) so staggered reveals never rely on paid plugins.
 * Returns the array of animatable targets.
 */
export function splitText(el, by = 'words') {
  if (!el) return []
  if (el.dataset.split)
    return [...el.querySelectorAll(by === 'chars' ? '.split-char' : '.split-word')]

  const text = el.textContent
  el.textContent = ''
  el.dataset.split = by
  el.setAttribute('aria-label', text)

  const line = document.createElement('span')
  line.className = 'split-line'
  line.setAttribute('aria-hidden', 'true')

  const targets = []
  text.split(' ').forEach((word, i, arr) => {
    const w = document.createElement('span')
    w.className = 'split-word'
    if (by === 'chars') {
      ;[...word].forEach((ch) => {
        const c = document.createElement('span')
        c.className = 'split-char'
        c.textContent = ch
        w.appendChild(c)
        targets.push(c)
      })
    } else {
      w.textContent = word
      targets.push(w)
    }
    line.appendChild(w)
    if (i < arr.length - 1) line.appendChild(document.createTextNode('\u00A0'))
  })
  el.appendChild(line)
  return targets
}
