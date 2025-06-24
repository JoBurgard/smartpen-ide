import { WebUI } from '@webui-dev/bun-webui';

const myWindow = new WebUI();
myWindow.show(await Bun.file('index.html').text());
await WebUI.wait();
