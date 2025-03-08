import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';

@Controller('opportunity')
export class OpportunityController {
  constructor(private readonly opportunityService: OpportunityService) {}

  @Post()
  create(@Body() createOpportunityDto: CreateOpportunityDto) {
    return this.opportunityService.create(createOpportunityDto);
  }

  @Get()
  findAll() {
    return this.opportunityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opportunityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpportunityDto: UpdateOpportunityDto) {
    return this.opportunityService.update(+id, updateOpportunityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opportunityService.remove(+id);
  }
}
