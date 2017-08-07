/**
 * @description 代理按键组合
 * @author USHOW JACK, EMAIL: ushowjack@GMail.com.
 * @param {any} callback 
 */

/**
 * @description 
 * @author USHOW JACK, EMAIL: ushowjack@GMail.com.
 * @param {any} string 格式 keydown/'a+b+c+d' or click/5
 */
/**
 * @description 
 * @author USHOW JACK, EMAIL: ushowjack@GMail.com.
 * @param {any} type 'click'/'keydown' default is keydown.
 */
class proxyPress {
    constructor(type = 'keydown', rule, callback) {
        this.type = type;
        this.count = 0;
        this.rule = rule;
        this.keyGroup = [];
        this.Timer;
        this.fn = callback;
        this.keyEvent = null;

        if (type === 'keydown') {
            this.addKeydownEvent();
        } else {
            this.addClickEvent();
        }
        return this;
    }
    addKeydownEvent() {

        this.keyEvent = function(e) {
            if (this.Timer) {
                window.clearTimeout(this.Timer);
            }
            this.keyGroup.push(e.keyCode || event.which);
            const keyString = this.keyGroup.join('+');
            if (this.rule === keyString) {
                this.fn.apply(this);
                this.keyGroup = [];
            }
            this.Timer = window.setTimeout(() => {
                this.keyGroup = [];
            }, 300);
        }.bind(this);

        document.addEventListener('keydown', this.keyEvent, false);
    }
    addClickEvent() {

        this.keyEvent = function(e) {
            if (this.Timer) {
                window.clearTimeout(this.Timer);
            }
            this.count++;

            if (this.rule === this.count) {
                this.fn.apply(this);
                this.count = 0;
            }
            this.Timer = window.setTimeout(() => {
                this.count = 0;
            }, 300);
        }.bind(this);

        document.addEventListener('click', this.keyEvent, false);
    }
    removeKeydownEvent() {
        if (!this.keyEvent) {
            return false;
        }

        typeof this.rule == 'number' ? document.removeEventListener('keydown', this.keyEvent, false) :
            document.removeEventListener('click', this.keyEvent, false);
    }
}

export default proxyPress;