import { format } from 'logform';
import * as colors from 'colors/safe';
import { createLogger, transports } from 'winston';
import { ConfigService } from '@nestjs/config';

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red',
});

const splat = (Symbol.for('splat') as unknown) as string;
const level = (Symbol.for('level') as unknown) as string;

const formatMetadata = format((info) => {
  info.label = `[${info.label}]`;
  info.level = `[${info.level}]`;
  info.timestamp = new Date(info.timestamp).toLocaleString(undefined, {
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    day: '2-digit',
    month: '2-digit',
  });

  return info;
});

const colorize = format((info) => {
  info.label = colors.yellow(info.label);
  info.ms = colors.yellow(info.ms);

  if (colors[info[level]]) {
    info.level = colors[info[level]](info.level);
    info.message = colors[info[level]](info.message);
  } else {
    info.level = colors.green(info.level);
    info.message = colors.green(info.message);
  }

  return info;
});

const logFormat = format.printf(
  ({ timestamp, label, level, message, ms, ...meta }) => {
    return `${timestamp} ${label} ${level} ${message} ${ms} ${meta[splat]
      .map((context: unknown) => JSON.stringify(context))
      .join(' ')}`;
  },
);

export function createLoggerFactory(
  label: string,
  configService: ConfigService,
) {
  const formats = [
    format.timestamp(),
    format.ms(),
    format.label({ label }),
    formatMetadata(),
  ];

  const logger = createLogger({
    format: format.combine(...formats, logFormat),
    transports: [
      new transports.File({ filename: '/var/log/skeleton/main.log' }),
    ],
  });

  if (configService.get('NODE_ENV') === 'development') {
    logger.add(
      new transports.Console({
        format: format.combine(colorize(), logFormat),
      }),
    );
  }

  return logger;
}
