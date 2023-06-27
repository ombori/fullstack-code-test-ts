import { IsInt, IsEmail, IsString, IsUrl, ValidateNested } from 'class-validator';

export class OuterApiUser {
  @IsInt()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsUrl()
  avatar: string;
}

export class OuterApiResponse {
  @IsInt()
  page: number;

  @IsInt()
  per_page: number;

  @IsInt()
  total: number;

  @IsInt()
  total_pages: number;

  @ValidateNested()
  data: Array<OuterApiUser>;

  toJSON() {
    return {
      page: this.page,
      per_page: this.per_page,
      total: this.total,
      total_pages: this.total_pages,
      data: this.data,
    };
  }
}
