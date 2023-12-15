import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    console.log(this.jwtService.verify(token));
    // try {
    //   const decodedToken = this.jwtService.verify(token);
    //   req.userId = decodedToken.id;
    //   next();
    // } catch (err) {
    //   throw new UnauthorizedException('Invalid Token');
    // }
  }
}
