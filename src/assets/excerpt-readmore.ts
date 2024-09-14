class ExcerptReadmore extends HTMLElement {
    static defaultExcerptLength = 200

    get textContainer (): HTMLElement {
        return this.querySelector(':scope > :first-child')!
    }

    get linkContainer (): HTMLElement {
        return this.querySelector(':scope > :last-child')!
    }

    string: string

    constructor () {
        super()
        this.string = this.textContainer.innerText

        let excerptLength = +(this.getAttribute('excerpt-length') || ExcerptReadmore.defaultExcerptLength)

        if (this.string.length <= excerptLength) {
            this.unfold()
            return
        }

        this.textContainer.innerText = this.trimmedString(excerptLength)
        this.linkContainer.style.display = 'block'

        this.linkContainer.querySelector('button')!.addEventListener('click', event => {
            event.preventDefault()
            this.unfold()
        }, true)
    }

    unfold () {
        this.textContainer.innerText = this.string
        this.linkContainer.style.display = 'none'
    }

    trimmedString (excerptLength: number) {
        return this.string.substring(0, this.string.substring(0, excerptLength).lastIndexOf(' ')) + '…'
    }
}

customElements.define('excerpt-readmore', ExcerptReadmore)
