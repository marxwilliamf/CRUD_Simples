import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class UpdatedClient {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber('BR')
    phone: string;
}
