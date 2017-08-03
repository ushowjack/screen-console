import ScreenConsole from 'screen-console';
window.screenConsole = new ScreenConsole();
screenConsole.init();
screenConsole.log(1);
screenConsole.error(1);
screenConsole.info(1);
window.a = screenConsole.proxyPress('49+49', () => {
    screenConsole.consoleShow();
});
window.b = screenConsole.proxyPress('50+50', () => {
    screenConsole.consoleHide();
});
window.c = screenConsole.proxyPress('51+51', () => {
    screenConsole.clear();
});