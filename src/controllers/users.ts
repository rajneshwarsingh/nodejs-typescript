import { Request, Response } from 'express';
import logger from '../uitilities/logger';
import { UserServices } from '../services/users';
import { message, statusCode } from '../uitilities/constants';
import { successAction, failAction } from '../uitilities/response';

class userController {
  public static async userList(req: Request, res: Response) {
    try {
      const data = await UserServices.userList(req.query);
      res.status(statusCode.success).json(successAction(statusCode.success, data, message.fetch('User')));
    } catch (err: any) {
      logger.error(message.errorLog('userList', 'userController', err));
      res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }

  public static async userAdd(req: Request, res: Response) {
    try {
      const data = await UserServices.userAdd(req.body);
      res.status(statusCode.success).json(successAction(statusCode.success, data, message.add('User')));
    } catch (err: any) {
      logger.error(message.errorLog('userAdd', 'userController', err));
      res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }

  public static async userUpdate(req: Request, res: Response) {
    try {
      const data = await UserServices.userUpdate(req.params, req.body);
      res.status(statusCode.success).json(successAction(statusCode.success, data, message.update('User')));
    } catch (err: any) {
      logger.error(message.errorLog('userUpdate', 'userController', err));
      res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }

  public static async userDelete(req: Request, res: Response) {
    try {
      const data = await UserServices.userDelete(req.params);
      res.status(statusCode.success).json(successAction(statusCode.success, data, message.delete('User')));
    } catch (err: any) {
      logger.error(message.errorLog('userDelete', 'userController', err));
      res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }

  public static async login(req: Request, res: Response) {
    try {
      const data = await UserServices.login(req.body);
      if (data === 'invalidUser') {
        res.status(statusCode.success).json(failAction(statusCode.success, data, message.invalidlogin));
      } else if (data === 'notExist') {
        res.status(statusCode.success).json(failAction(statusCode.success, data, message.notExist('User')));
      } else {
        res.status(statusCode.success).json(successAction(statusCode.success, data, message.login));
      }
    } catch (err: any) {
      logger.error(message.errorLog('login', 'userController', err));
      res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }
}

export default userController;
