using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
using RankingAPI.Data;
using RankingAPI.Models;

namespace RankingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly APIContext _context;
        public ItemController(APIContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<List<Item>>> AddItem(Item item)
        {
            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return Ok(await _context.Items.ToListAsync());
        }

        [HttpGet]
        public async Task<ActionResult<List<Item>>> GetAllItems() 
        {
            return Ok(await _context.Items.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return BadRequest("Item not found.");
            }
            return Ok(item);
        }
    }
}
