export class Accordion {            //https://codepen.io/chriscoyier/pen/XWNqxyY
    el: HTMLDetailsElement;         // Store the <details> element
    summary: HTMLElement;           // Store the <summary> element
    content: HTMLElement;           // Store the <div class="content"> element
    animation: Animation | null;    // Store the animation object (so we can cancel it if needed)
    isClosing: boolean;             // Store if the element is closing
    isExpanding: boolean;           // Store if the element is expanding

    constructor(el: HTMLDetailsElement) {
        this.el = el;
        this.summary = el.querySelector('summary')!;
        this.content = el.querySelector('.content')!;

        this.animation = null;
        this.isClosing = false;
        this.isExpanding = false;

        this.summary.addEventListener('click', (e) => this.onClick(e)); // Detect user clicks on the summary element
    }

    private onClick(e: MouseEvent) {
        e.preventDefault();
        this.el.style.overflow = 'hidden'; // Add an overflow on the <details> to avoid content overflowing

        if (this.isClosing || !this.el.open) { // Check if the element is being closed or is already closed
            this.open();
        } else if (this.isExpanding || this.el.open) { // Check if the element is being openned or is already open
            this.shrink();
        }
    }
    
    private expand() {
        this.isExpanding = true; // Set the element as "being expanding"
        const startHeight = this.el.offsetHeight; // Get the current fixed height of the element
        const endHeight = this.summary.offsetHeight + this.content.offsetHeight; // Calculate the open height of the element (summary height + content height)

        this.startAmimation(startHeight, endHeight);
        this.animation!.onfinish = () => this.onAnimationFinish(true);
        this.animation!.oncancel = () => this.isExpanding = false;
    }

    private startAmimation(startHeight: number, endHeight: number) {
        this.animation && this.animation.cancel();

        this.animation = this.el.animate({
            height: [`${startHeight}px`, `${endHeight}px`] // Set the keyframes from the startHeight to endHeight
        }, {
            duration: 150,
            easing: 'ease-out'
        });
    }

    private onAnimationFinish(open: boolean) {
        this.el.open = open;
        this.animation = null;
        this.isClosing = false;
        this.isExpanding = false;
        this.el.style.height = this.el.style.overflow = ''; // Remove the overflow hidden and the fixed height
    }

    public shrink() {
        this.isClosing = true;
        const startHeight = this.el.offsetHeight; // Store the current height of the element
        const endHeight = this.summary.offsetHeight; // Calculate the height of the summary

        this.startAmimation(startHeight, endHeight);
        this.animation!.onfinish = () => this.onAnimationFinish(false);
        this.animation!.oncancel = () => this.isClosing = false;
    }

    public open() {
        this.el.style.height = `${this.el.offsetHeight}px`; // Apply a fixed height on the element
        this.el.open = true; // Force the [open] attribute on the details element
        window.requestAnimationFrame(() => this.expand()); // Wait for the next frame to call the expand function
    }
}
