using WebAPIMovie.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
    
namespace WebAPIMovie.Service
{
    public class MovieService
    {
        private readonly IMongoCollection<Movie> _movies;

        public MovieService(IOptions<MovieStoreDatabaseSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);

            _movies = database.GetCollection<Movie>(settings.Value.MovieCollectionName);
        }

        public async Task<List<Movie>> GetAsync() =>  await _movies.Find(_movies => true).ToListAsync();

        public async Task<Movie?> Get(string id) =>
           await _movies.Find<Movie>(movie => movie.Id == id).FirstOrDefaultAsync();

        public async Task Create(Movie movie)
        {
            await _movies.InsertOneAsync(movie);
            
        }

        public async Task Update(string id,Movie movieIn) =>
           await _movies.ReplaceOneAsync(movie => movie.Id == id,movieIn);

        public async Task Remove(Movie movieIn) =>
           await _movies.DeleteOneAsync(movie => movie.Id == movieIn.Id);

        public async Task Remove(string id) =>
           await _movies.DeleteOneAsync(movie => movie.Id == id);
    }
}
