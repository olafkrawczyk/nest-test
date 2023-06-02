import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiExcludeEndpoint,
  ApiHideProperty,
  ApiProperty,
} from '@nestjs/swagger';

const enabled = process.env.FF_ENABLED === 'true';

const FeatureProperty = (...args) => {
  switch (process.env.FF_ENABLED) {
    case 'false':
      return ApiHideProperty();
    default:
      return ApiProperty(...args);
  }
};

class Person {
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @FeatureProperty()
  passportNumber: string; // only enabled if process.env.FF_PASSPORT === true
}

@Controller('name')
export class NameController {
  @Get()
  getName(@Query('name') name: string): Person {
    return { name: 'Olaf', surname: 'Krawczyk', passportNumber: 'azxc' };
  }

  @ApiExcludeEndpoint(!enabled)
  @Get('name-new')
  getNameNew(@Query('name') name: string): unknown {
    return { name, api: 'new' };
  }

  @Post()
  createName(@Body() createName: Person) {
    return createName;
  }
}
