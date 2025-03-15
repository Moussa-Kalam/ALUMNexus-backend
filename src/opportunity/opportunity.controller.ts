import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { OpportunityService } from './opportunity.service';
import { ActiveUser } from '../iam/decorators/active-user-decorator';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { Roles } from '../iam/authorization/decorators/roles.decorator';
import { UserRoles } from '../common/enums/roles.enum';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('opportunity')
export class OpportunityController {
  constructor(private readonly opportunityService: OpportunityService) {}

  @Roles(UserRoles.ALUMNUS, UserRoles.FACULTY)
  @Post()
  create(
    @Body() createOpportunityDto: CreateOpportunityDto,
    @ActiveUser() activeUser: ActiveUserData,
  ) {
    return this.opportunityService.create(createOpportunityDto, activeUser);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.opportunityService.findAll(paginationQuery);
  }

  @Get('recent')
  findRecent() {
    return this.opportunityService.findRecent();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opportunityService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOpportunityDto: UpdateOpportunityDto,
  ) {
    return this.opportunityService.update(id, updateOpportunityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opportunityService.remove(id);
  }
}
