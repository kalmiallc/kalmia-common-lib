# AppLogger usage
AppLogger is general wrapper that is compliant with other logging frameworks, such as Pino, Winston, NestJs logger. 
It supports other types of loggers. Currently standard logger is used as default.

The default logger can be overridden with the setLogger method.

The following log levels are used:
 
* info - shall be used for communication of the most general messages. 
* warn - to communicate warnings.
* error - to communicate errors.
* debug - for debugging purposes -- this level is generally not available in production mode.
* verbose - very detailed debugging messages -- this level is generally not available in production mode.


All application code shall use AppLogger for logging.