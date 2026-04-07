import { nextTick, onMounted, onUnmounted } from 'vue'

/**
 * Añade la clase `is-visible` cuando el elemento entra en el viewport.
 * @param {import('vue').Ref<HTMLElement | null>} elRef
 */
export function useRevealOnScroll(elRef, options = {}) {
  const rootMargin = options.rootMargin ?? '0px 0px -8% 0px'
  const threshold = options.threshold ?? 0.12

  let observer

  function observe(el) {
    observer?.disconnect()
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            observer.unobserve(e.target)
          }
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(el)
  }

  onMounted(() => {
    nextTick(() => observe(elRef.value))
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
