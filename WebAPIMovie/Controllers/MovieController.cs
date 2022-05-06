using Microsoft.AspNetCore.Mvc;
using WebAPIMovie.Models;
using WebAPIMovie.Service;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPIMovie.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly MovieService _movieService;
        public MovieController(MovieService movieService)
        {
            _movieService = movieService;
        }
        
        // GET: api/<MovieController>
        [HttpGet]
        public async Task<List<Movie>> Get() => await _movieService.GetAsync();


        // GET api/<MovieController>/5
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Movie>> Get(string id)
        {
            var movie = await _movieService.Get(id);
            if (movie == null)
            {
                return NotFound();
            }
            return movie;
        }

        // POST api/<MovieController>
        [HttpPost]
        public async Task<IActionResult> Post(Movie newMovie)
        {
            await _movieService.Create(newMovie);
            return CreatedAtAction(nameof(Get),new { id = newMovie.Id.ToString() },newMovie);
        }

        // PUT api/<MovieController>/5
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Put(string id,Movie updateMovie)
        {
            var movie = await _movieService.Get(id);
            if (movie == null)
            {
                return NotFound();
            }
            updateMovie.Id = movie.Id;
            await _movieService.Update(id,updateMovie);
            return NoContent();
        }

        // DELETE api/<MovieController>/5
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var movie = await _movieService.Get(id);
            if (movie == null)
            {
                return NotFound();
            }
            await _movieService.Remove(id);
            return NoContent();
        }
    }
}
