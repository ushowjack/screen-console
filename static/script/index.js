import proxyPress from './base/proxyPress';

/**
 * Creates an instance of ScreenConsole.
 * @author USHOW JACK, EMAIL: ushowjack@GMail.com.
 * @param {string} [options={
 *         logColor: 'lightgreen',
 *         infoColor: 'blue',
 *         warnColor: 'orange',
 *         errorColor: 'red',
 *         isShow: false,
 *         isScrollToBack: false
 *     }] 
 * @memberof ScreenConsole
 */

class ScreenConsole {
    constructor(options = {
        logColor: 'lightgreen',
        infoColor: 'yellow',
        warnColor: 'white',
        errorColor: 'red',
        isShow: false,
        isScrollToBack: false
    }) {
        if (typeof ScreenConsole.instance === 'object') {
            return ScreenConsole.instance;
        }
        //缓存实例 
        this.cacheInstance();
        // 获取body标签
        this.$body = document.querySelector('body');
        this.$console = null;
        this.$consoleVirtualList = '';
        this.$consoleList = [];
        // console方法存储
        this._console = {};
        // 配置
        this._options = options;

        return this;
    }

    // 缓存实例
    cacheInstance() {
        ScreenConsole.instance = this;
    }

    // 初始化
    init(press) {
        // 获取console.log的值
        // 创建虚拟的dom
        this.$console = this.createDOM({
            tag: 'div',
            className: 'console'
        });
        this.saveConsoleFn();
        this.$console.innerHTML = this.$consoleVirtualList;
    }

    // 保存console的方法
    saveConsoleFn() {
        const originalFnCallDecorator = this.originalFnCallDecorator;

        this._console.log = console.log;
        this._console.clear = console.clear;
        this._console.info = console.info;
        this._console.warn = console.warn;
        this._console.error = console.error;

        console.log = this.originalFnCallDecorator(this.log, 'log');
        console.clear = this.originalFnCallDecorator(this.clear, 'clear');
        console.info = this.originalFnCallDecorator(this.info, 'info');
        console.warn = this.originalFnCallDecorator(this.warn, 'warn');
        console.error = this.originalFnCallDecorator(this.error, 'error');
    }

    // console原生和包装方法一起用
    originalFnCallDecorator(fn, fnName) {
        const _self = this;

        return function() {
            fn.apply(_self, arguments);
            // debugger
            if (typeof _self._console[fnName] === 'function') {
                _self._console[fnName].apply(console, arguments);
            }
        };
    }


    /**
     * @description 对console进行展示，并且修改状态值
     * @author USHOW JACK, EMAIL: ushowjack@GMail.com.
     * @memberof ScreenConsole
     */
    consoleShow() {
        if (!this.$console) {
            return false;
        }
        this._options.isShow = true;
        const consoleDOM = document.querySelector('.console');
        if (!consoleDOM) {
            this.appendDOM(this.$console, this.$body);
            this.$console.innerHTML = this.$consoleVirtualList;
        } else {
            this.$console.style.display = 'block';
            const hideContent = this.createDOM({
                tag: 'div',
                css: `width:300px;`,
            })
            hideContent.innerHTML = this.$consoleVirtualList;
            this.$consoleVirtualList = '';
            this.appendDOM(hideContent, this.$console);
        };
    }

    /**
     * @description 对console进行隐藏并且设置状态值
     * @author USHOW JACK, EMAIL: ushowjack@GMail.com.
     * @memberof ScreenConsole
     */
    consoleHide() {
        this._options.isShow = false;
        this.$console.style.display = 'none';
        this.$consoleVirtualList = '';
    }

    /**
     * @description 用来切换滚动状态的方法
     * @author USHOW JACK, EMAIL: ushowjack@GMail.com.
     * @returns 
     * @memberof ScreenConsole
     */
    scrollToggle() {
        this._options.isScrollToBack = !this._options.isScrollToBack;
        return this._options.isScrollToBack;
    }



    /**
     * @description 用于摧毁整个控制台，但是仍然可以使用该实例，只是清空dom而已
     * @author USHOW JACK, EMAIL: ushowjack@GMail.com.
     * @memberof ScreenConsole
     */
    destroy() {
        // 不制空实例，一次加载只创建一次

        const _console = this._console;
        this._options.isShow = false;
        // 恢复打印方法；
        console.log = _console.log;
        console.clear = _console.clear;
        console.info = _console.info;
        console.warn = _console.warn;
        console.error = _console.error;

        this.$body.removeChild(this.$console);
        this.clear();
        this.$console = null;
    }


    /**
     * @description 创建dom，并且有默认样式
     * @author USHOW JACK, EMAIL: ushowjack@GMail.com.
     * @param {any} { tag, css = 'width:300px;height:500px;overflow-y:scroll;background:rgba(0,0,0,0.7);', className = '' } 
     * @returns 
     * @memberof ScreenConsole
     */
    createDOM({
        tag,
        css = `width:300px;
               position:fixed;
               top:0;right:0;
               max-height:500px;
               min-height:200px;
               overflow-y:auto;
               background:rgba(0,0,0,0.7);`,
        className = ''
    }) {
        let element = document.createElement(tag);
        // 添加css样式
        element.style.cssText = css;
        // 添加类名
        element.className = className;
        return element
    }


    /**
     * @description 根据传入的类型才用不同的方式添加dom
     * @author USHOW JACK, EMAIL: ushowjack@GMail.com.
     * @param {any} $dom 
     * @param {any} $target 
     * @memberof ScreenConsole
     */
    appendDOM($dom, $target) {
        typeof $dom === 'object' ?
            $target.appendChild($dom) :
            $target.innerHTML = $dom;
    }


    /**
     * @description 添加dom
     * @author USHOW JACK, EMAIL: ushowjack@GMail.com.
     * @param {any} type 
     * @param {any} text 
     * @memberof ScreenConsole
     */
    genericLogger(type, text) {
        // debugger
        if (!this.$console) {
            return false;
        }
        if (this._options.isShow) {
            const $logger = document.createElement('div');
            $logger.style.cssText = `color:${this._options[type+"Color"]};
                                    min-height:30px;
                                    line-height:20px;
                                    width:100%;
                                    box-sizing:border-box;
                                    word-wrap:break-word;
                                    border-bottom: 1px solid white;
                                    padding:5px;`;
            $logger.textContent = text;
            this.appendDOM($logger, this.$console);
            // 自动滚动到底部
            if (this._options.isScrollToBack) {
                this.$console.scrollTop = this.$console.scrollHeight - this.$console.clientHeight;
            }
        } else {
            this.$consoleVirtualList += `<div style="color:${this._options[type+'Color']};
                                                     min-height:30px;
                                                     line-height:20px;
                                                     width:100%;
                                                     box-sizing:border-box;
                                                     word-wrap:break-word;
                                                     border-bottom: 1px solid white;
                                                     padding:5px;">
                                            ${text}
                                         </div>`
        }
    }

    // console的各大方法
    log(val) {
        this.genericLogger('log', val);
    }
    info(val) {
        this.genericLogger('info', val);
    }
    warn(val) {
        this.genericLogger('warn', val);
    }
    error(val) {
        this.genericLogger('error', val);
    }
    clear() {
        // 清除掉控制台的dom和虚拟的
        this.$consoleVirtualList = '';
        this.$console.innerHTML = '';
    }


    /**
     * @description 代理按键
     * @author USHOW JACK, EMAIL: ushowjack@GMail.com.
     * @param {any} keyString 
     * @returns 
     * @memberof ScreenConsole
     */
    proxyPress(type, rule, callback) {
        const press = new proxyPress(type, rule, callback);
        return press;
    }

}

export default ScreenConsole;