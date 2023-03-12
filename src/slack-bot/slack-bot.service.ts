import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WebClient } from '@slack/web-api';
import { Model } from 'mongoose';
import { BlocksDocument } from 'src/schemas/blocks.schema';
import { LogsDocument } from 'src/schemas/logs.schema';
import { TxReceiptsDocument } from 'src/schemas/txReceipts.schema';
import { formatDBStatMessage, sendSlack } from 'src/utils/slack';

@Injectable()
export class SlackBotService {
  private readonly web: WebClient;
  constructor(
    @InjectModel('Blocks') private blocksModel: Model<BlocksDocument>,
    @InjectModel('TxReceipts')
    private txReceiptsModel: Model<TxReceiptsDocument>,
    @InjectModel('Logs') private logsModel: Model<LogsDocument>,
  ) {
    /** REPLACE HERE **/
    this.web = new WebClient(process.env.SLACK_DB_STATUS_TOKEN);
    /** Sending slack every 5 minutes **/
    const interval = 5 * 60 * 1000;

    setInterval(async () => {
      this.sendDBStatus();
    }, interval);
  }

  async getDBStatus() {
    const blockCount: number = await this.blocksModel.countDocuments({});
    const txCount: number = await this.txReceiptsModel.countDocuments({});
    const logCount: number = await this.logsModel.countDocuments({});

    return { blockCount, txCount, logCount };
  }

  async sendDBStatus() {
    const { blockCount, txCount, logCount } = await this.getDBStatus();

    const text = await formatDBStatMessage(blockCount, txCount, logCount);

    await sendSlack(
      this.web,
      text,
      process.env.SLACK_DB_STATUS_CHANNEL_NAME as string,
    );
  }
}
