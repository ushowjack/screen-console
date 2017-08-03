/**
 * @description 代理按键组合
 * @author USHOW JACK, EMAIL: ushowjack@GMail.com.
 * @param {any} callback 
 */

/**
 * @description 
 * @author USHOW JACK, EMAIL: ushowjack@GMail.com.
 * @param {any} string 格式 'a+b+c+d'
 */

class proxyPress {
    constructor(string, callback) {
        this.rule = string;
        this.keyGroup = [];
        this.Timer;
        this.fn = callback;

        this.keyEvent = null;

        this.addEvent();
        return this;
    }
    addEvent() {

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
    removeEvent() {
        if (!this.keyEvent) {
            return false;
        }
        document.removeEventListener('keydown', this.keyEvent, false);
    }
}

export default proxyPress;