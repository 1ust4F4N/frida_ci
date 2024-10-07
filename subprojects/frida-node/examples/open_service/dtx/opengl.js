const frida = require('../../..');

let opengl = null;

async function main() {
  const device = await frida.getUsbDevice();

  opengl = await device.openService('dtx:com.apple.instruments.server.services.graphics.opengl');
  opengl.message.connect(onMessage);
  await opengl.request({ method: 'setSamplingRate:', args: [ 5.0 ] });
  await opengl.request({ method: 'startSamplingAtTimeInterval:', args: [ 0.0 ] });
}

function onMessage(message) {
  console.log('onMessage:', message);
}

main()
  .catch(e => {
    console.error(e);
  });
