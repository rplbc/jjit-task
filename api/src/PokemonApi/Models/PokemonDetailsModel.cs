using System.Text.Json.Serialization;

namespace PokemonApi.Models;

public sealed class PokemonDetailsModel
{
    public int Id { get; init; }

    public string Name { get; init; } = string.Empty;

    [JsonPropertyName("base_experience")]
    public int BaseExperience { get; init; }

    [JsonPropertyName("img")]
    public string? Img { get; init; }

    public IReadOnlyList<string> Types { get; init; } = Array.Empty<string>();
}
