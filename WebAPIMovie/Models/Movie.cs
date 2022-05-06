using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebAPIMovie.Models
{
    public class Movie
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("Title")]
        public string Title { get; set; } = null!;
        public decimal Price { get; set; }
        public string Genre { get; set; } = null!;
        public string Year { get; set; } = null!;
        public string Rating { get; set; } = null!;       
    }
}
