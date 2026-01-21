using System.Text.Json.Serialization;

namespace PokemonApi.Models;

internal sealed record PokeApiPokemon(
    int Id,
    string Name,
    [property: JsonPropertyName("base_experience")] int BaseExperience,
    PokeApiSprites? Sprites = null,
    List<PokeApiTypeSlot>? Types = null
);

internal sealed record PokeApiSprites(
    [property: JsonPropertyName("front_default")] string? FrontDefault
);

internal sealed record PokeApiTypeSlot(PokeApiType Type);

internal sealed record PokeApiType(string Name);
