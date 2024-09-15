import { tns } from 'tiny-slider'
import { TinySliderSettings } from 'tiny-slider'
import 'tiny-slider/dist/tiny-slider.css'
import './tiny-slider.css'

class TinySlider extends HTMLElement {
    constructor () {
        super()
        this.waitForDOM();
    }

    private waitForDOM() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                tns(this.options);
            });
        } else {
            tns(this.options);
        }
    }

    private get options (): TinySliderSettings {
        let options: TinySliderSettings = { container: this, useLocalStorage: false }
        for (const attr of this.attributes) {
            let attributeName = attr.name.replace(/([-_][a-z])/ig, $1 => $1.toUpperCase().replace(/[-_]/, ''))
            if (['class', 'style'].includes(attributeName)) continue

            let branching = attributeName.split(/:/)
            let optionName = branching.pop() as string

            let root = options as any

            for (let branch of branching) {
                if (!(branch in root)) {
                    root[branch] = {}
                }
                root = root[branch]
            }

            root[optionName] = (value => {
                if (value === 'false') return false
                if (value === 'true') return true
                return value
            })(attr.value)
        }

        return options
    }
}

customElements.define('tiny-slider', TinySlider)
