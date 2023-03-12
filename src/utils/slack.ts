import { WebClient } from '@slack/web-api';

export const formatDBStatMessage = async (
  blockCount: number,
  txCount: number,
  logCount: number,
) => {
  const text = `---------------------------------------\n[ Accumulated Count ]\n 🔳 Block : ${blockCount}\n 💰 Transaction : ${txCount}\n ⏱ Log : ${logCount}\n---------------------------------------`;
  return text;
};

export const sendSlack = async (
  web: WebClient,
  text: string,
  channelName: string,
) => {
  try {
    await web.chat.postMessage({
      /** REPLACE HERE **/
      channel: '#' + channelName,
      text: text,
    });
  } catch (e) {}
};
