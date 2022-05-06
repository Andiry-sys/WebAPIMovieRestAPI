namespace WebAPIMovie.Models
{
    public class MovieStoreDatabaseSettings
    {
        public string? ConnectionString { get; set; } 

        public string? DatabaseName { get; set; } 

        public string? MovieCollectionName { get; set; }
    }
}
