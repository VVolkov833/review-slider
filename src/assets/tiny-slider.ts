import { tns } from 'tiny-slider';
import { TinySliderSettings } from 'tiny-slider';
import 'tiny-slider/dist/tiny-slider.css';
import './tiny-slider.css';

class TinySlider extends HTMLElement {
    constructor() {
        super();
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

    private get options(): TinySliderSettings {
        const switchResolution = 950;
        const defaultItems = 2;

        let options: TinySliderSettings = { 
            container: this, 
            useLocalStorage: false,
            responsive: {
                1: {
                    items: 1
                }
            }
        };

        if (!options.responsive) {
            options.responsive = {};
        }

        for (const attr of this.attributes) {
            // Convert attribute name to camelCase
            let attributeName = attr.name.replace(/([-_][a-z])/ig, $1 => 
                $1.toUpperCase().replace(/[-_]/, '')
            );
            
            if (['class', 'style'].includes(attributeName)) continue;

            // Handle attributes with colon for responsive settings
            let branching = attributeName.split(/:/);
            let optionName = branching.pop() as string;

            // Root represents the TinySliderSettings object
            let root = options as any;

            for (let branch of branching) {
                // If the branch doesn't exist, initialize it as an object
                if (!(branch in root)) {
                    root[branch] = {};
                }
                root = root[branch];
            }

            // Assign the value to the appropriate nested option
            root[optionName] = this.parseAttributeValue(attr.value);
        }

        options.responsive[switchResolution] = {
            items: options.items || defaultItems
        };

        return options;
    }

    // Helper to parse boolean, number, or string values from attributes
    private parseAttributeValue(value: string): any {
        if (value === 'false') return false;
        if (value === 'true') return true;
        const numberValue = parseFloat(value);
        return isNaN(numberValue) ? value : numberValue;
    }
}

customElements.define('tiny-slider', TinySlider);
