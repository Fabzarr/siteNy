import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { TimeSlotsService } from './services/time-slots.service';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly timeSlotsService: TimeSlotsService,
  ) {}

  @Get('available-slots')
  async getAvailableSlots(@Query('date') date: string) {
    if (!date) {
      throw new BadRequestException('La date est requise');
    }
    return this.timeSlotsService.getAvailableTimeSlots(date);
  }

  @Post('check-availability')
  async checkAvailability(
    @Body() data: { date: string; time: string; numberOfPeople: number },
  ) {
    const { date, time, numberOfPeople } = data;
    return {
      available: await this.timeSlotsService.isSlotAvailable(
        date,
        time,
        numberOfPeople,
      ),
    };
  }

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    const isAvailable = await this.timeSlotsService.isSlotAvailable(
      createReservationDto.date,
      createReservationDto.time,
      createReservationDto.numberOfPeople,
    );

    if (!isAvailable) {
      throw new BadRequestException(
        'Ce créneau n\'est pas disponible pour le nombre de personnes demandé',
      );
    }

    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: Partial<CreateReservationDto>,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
} 