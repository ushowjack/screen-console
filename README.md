# screen-console
Use for the device, which can't offer the console.I am at work, often on television for development, but the TV on the browser without a console.No console, led to the development of debugging bug is the biggest challenge.This time you need to write a console, the browser directly shows the results we want to print, or even V8 engine reported the wrong.So I wrote this plugin to implement this feature.

![screen-console](http://upload-images.jianshu.io/upload_images/4415565-7ae3ab168afa65ac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### How to import
You can download the zip file via github and introduce ./dist/js/index.js in HTML.
As follows:
```html
<script type="text/javascript" src="./js/index.js"></script>
```

You can also download it through the node package manager, npm, and import it in JavaScript files.
As follows:
```bash
cnpm i screen-console
```

After the installation is complete, you can import JavaScript files.
As follows:
```javascript
import ScreenConsole from 'screen-console';
```
In this way, the plugin can be used.

### How to use
```javascript

// Create an instance.
window.screenConsole = new ScreenConsole();
// Init the instance.
screenConsole.init();
// You can use the all functions of window.console.
screenConsole.log(1);
screenConsole.error(1);
screenConsole.info(1);
screenConsole.warn(1);

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

window.a = screenConsole.proxyPress('keydown','49+49', () => {
    // Make the console show.
    screenConsole.consoleShow();
});
window.b = screenConsole.proxyPress('keydown','50+50', () => {
    // Make the console hide.    
    screenConsole.consoleHide();
});
window.c = screenConsole.proxyPress('click',2, () => {
    // Make the console clear.
    screenConsole.clear();
});
// And you also can remove the event.
window.a.removeEvent();
window.b.removeEvent();
window.c.removeEvent();

// Finally, you must know that the instance can only be instantiated once.But you can remove the DOM, through the destroy function.
screenConsole.destroy();
```
