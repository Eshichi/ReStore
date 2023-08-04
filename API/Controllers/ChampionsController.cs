using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ChampionsController : BaseApiController
    {
        private readonly StoreContext _context; //??
        public ChampionsController(StoreContext context)
        {
            //??
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Champion>>> GetChampions()
        {
            return await _context.Champions.ToListAsync();
        }
    }
}