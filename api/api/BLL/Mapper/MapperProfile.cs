﻿using AutoMapper;
using Business.DTOs.DriverDtos;
using Business.DTOs.RideDtos;
using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Mapper
{
    public class MapperProfile:Profile
    {
        public MapperProfile()
        {
            CreateMap<DriverGetDto, Driver>();
            CreateMap<Driver, DriverGetDto>().ReverseMap();
            CreateMap<Ride, RideAddDto>().ReverseMap();
            CreateMap<Driver, DriverShortDto>();
            CreateMap<Driver, DriverForRideDto>().ReverseMap();
            CreateMap<Ride, RideGetDto>().ReverseMap();
            CreateMap<Driver, DriverAddDto>().ReverseMap();
        }
    }
}
