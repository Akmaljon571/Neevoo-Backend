import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class ErrorHandle implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
