using System.Net;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Caching.Memory;

namespace PokemonApi.Services;

public sealed class PokemonDetailsService : IPokemonDetailsService
{
    private static readonly TimeSpan CacheDuration = TimeSpan.FromHours(1);
    private readonly HttpClient _httpClient;
    private readonly IMemoryCache _cache;

    public PokemonDetailsService(HttpClient httpClient, IMemoryCache cache)
    {
        _httpClient = httpClient;
        _cache = cache;
    }

    public async Task<PokemonDetailsModel?> GetPokemonAsync(int id, CancellationToken cancellationToken)
    {
        if (_cache.TryGetValue(id, out PokemonDetailsModel? cached))
        {
            return cached;
        }

        using var response = await _httpClient.GetAsync($"pokemon/{id}", cancellationToken);

        if (response.StatusCode == HttpStatusCode.NotFound)
        {
            return null;
        }

        response.EnsureSuccessStatusCode();

        var payload = await response.Content.ReadFromJsonAsync<PokeApiPokemon>(cancellationToken: cancellationToken);
        if (payload is null)
        {
            return null;
        }

        var details = new PokemonDetailsModel
        {
            Id = payload.Id,
            Name = payload.Name,
            BaseExperience = payload.BaseExperience,
            Img = payload.Sprites?.FrontDefault,
            Types = payload.Types
                .Select(type => type.Type.Name)
                .Where(name => !string.IsNullOrWhiteSpace(name))
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .ToArray(),
        };

        _cache.Set(id, details, CacheDuration);
        return details;
    }
}

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

internal sealed class PokeApiPokemon
{
    public int Id { get; init; }

    public string Name { get; init; } = string.Empty;

    [JsonPropertyName("base_experience")]
    public int BaseExperience { get; init; }

    public PokeApiSprites Sprites { get; init; } = new();

    public List<PokeApiTypeSlot> Types { get; init; } = new();
}

internal sealed class PokeApiSprites
{
    [JsonPropertyName("front_default")]
    public string? FrontDefault { get; init; }
}

internal sealed class PokeApiTypeSlot
{
    public PokeApiType Type { get; init; } = new();
}

internal sealed class PokeApiType
{
    public string Name { get; init; } = string.Empty;
}
