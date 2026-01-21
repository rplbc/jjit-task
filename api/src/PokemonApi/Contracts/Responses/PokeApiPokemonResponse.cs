using System.Text.Json.Serialization;

namespace PokemonApi.Contracts.Responses;

internal sealed record PokeApiPokemonResponse(
    int Id,
    string Name,
    [property: JsonPropertyName("base_experience")] int BaseExperience,
    PokeApiSpritesResponse? Sprites = null,
    List<PokeApiTypeSlotResponse>? Types = null
);

internal sealed record PokeApiSpritesResponse(
    [property: JsonPropertyName("front_default")] string? FrontDefault
);

internal sealed record PokeApiTypeSlotResponse(PokeApiTypeResponse Type);

internal sealed record PokeApiTypeResponse(string Name);
