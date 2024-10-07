class ExcerptReadmore extends HTMLElement {
    static defaultExcerptLength = 200

    get textContainer(): HTMLElement {
        return this.querySelector(':scope > :first-child')!
    }

    get linkContainer(): HTMLElement {
        return this.querySelector(':scope > :last-child')!
    }

    string: string
    isExpanded = false
    needsExpansion = false

    constructor() {
        super()
        this.waitForDOM()
    }

    waitForDOM() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.init()
            })
        } else {
            this.init()
        }
    }

    init() {
        this.string = this.textContainer.innerText

        let excerptLength = +(this.getAttribute('excerpt-length') || ExcerptReadmore.defaultExcerptLength)

        if (this.string.length > excerptLength) {
            this.needsExpansion = true
            this.updateContent(excerptLength)
            this.linkContainer.style.display = 'block'

            const button = this.linkContainer.querySelector('button')!
            button.addEventListener('click', event => {
                event.preventDefault()
                this.toggleContent()
            }, true)
        } else {
            this.unfold()
            this.linkContainer.style.display = 'none'
        }
    }

    toggleContent() {
        this.isExpanded = !this.isExpanded

        if (this.isExpanded) {
            this.unfold()
        } else {
            this.fold()
        }
    }

    swapButtonText() {
        const button = this.linkContainer.querySelector('button')
        if ( !button ) return
        const swapText = button.getAttribute('data-text-swap') || ''
        const swapBackText = button.innerText || ''
        button.innerText = swapText
        button.setAttribute('data-text-swap', swapBackText)
    }

    unfold() {
        this.textContainer.innerText = this.string
        if (this.needsExpansion) {
            this.swapButtonText()
        }
    }

    fold() {
        const excerptLength = +(this.getAttribute('excerpt-length') || ExcerptReadmore.defaultExcerptLength)
        this.updateContent(excerptLength)
        if (this.needsExpansion) {
            this.swapButtonText()
        }
    }

    updateContent(excerptLength: number) {
        this.textContainer.innerText = this.trimmedString(excerptLength)
    }

    trimmedString(excerptLength: number) {
        return this.string.substring(0, this.string.substring(0, excerptLength).lastIndexOf(' ')) + '…'
    }
}

customElements.define('excerpt-readmore', ExcerptReadmore)
