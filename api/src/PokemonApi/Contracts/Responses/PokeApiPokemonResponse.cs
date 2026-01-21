using System.Text.Json.Serialization;

namespace PokemonApi.Contracts.Responses;

public record PokeApiPokemonResponse(
    int Id,
    string Name,
    [property: JsonPropertyName("base_experience")] int BaseExperience,
    PokeApiSpritesResponse? Sprites = null,
    List<PokeApiTypeSlotResponse>? Types = null
);

public record PokeApiSpritesResponse(
    [property: JsonPropertyName("front_default")] string? FrontDefault
);

public record PokeApiTypeSlotResponse(PokeApiTypeResponse Type);

public record PokeApiTypeResponse(string Name);
